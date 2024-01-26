import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto, updateRoleDto, roleInfoDto, roleListDto, addRoleFuncDto, deleteRoleDto } from 'src/dto/role.dto';
import * as _ from 'lodash'
import { Op } from 'sequelize'
// import * as db from 'src/models/';
import { Responser } from 'src/common/utils/responser';
import { Func } from 'src/models/func.model';
import { Role } from 'src/models/role.model';
import { RoleFunc } from 'src/models/roleFunc.model';
import { UtilsService } from 'src/api/utils/utils.service';
import { UserRole } from 'src/models';
import { RedisCacheService } from '../redis-cache/redis-cache.service';


@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Func)
    private funcModel: typeof Func,
    @InjectModel(RoleFunc)
    private roleFuncModel: typeof RoleFunc,
    @InjectModel(UserRole)
    private userRoleModel : typeof UserRole,
   
  
    private utilsService: UtilsService,
    private redis : RedisCacheService
  ) {

    this.setRolesAccessOnRedis()
  }

  async getRoleList(data: roleListDto) : Promise<{
    rows: Role[];
    count: number;
}>  {
   

    let getListQuery = await this.utilsService.getListQueryCreator({
      data,
      model: this.roleModel,
    });

    const {where, order, limit, offset} = getListQuery
    
    let list = await this.roleModel.findAndCountAll({
      where,
      attributes : this.utilsService.getColumnsListByType({
        model: this.roleModel,
        omit: ['deletedAt', 'updatedAt', "ord"]
      }),
      raw: true,
      order,
      limit,
      offset
    });

    return list;
  }

  async addRole(data: createRoleDto): Promise<insertInterface> {
       let dataObj = this.utilsService.omitNull(data);
       let role = await this.roleModel.create(dataObj);
       return {id: role.id}
      
  }

  async roleInfo(id: number): Promise<Role> {
    let role = await this.roleModel.findByPk(id, 
      { 
        include: [
          {
            model: this.funcModel,
            as: 'funcs',
            attributes: ['id', 'name',"description", "service"],
            through: { attributes: [] },
          },
        ],
        attributes: this.utilsService.getColumnsListByType({
          model: this.roleModel,
          omit: ['deletedAt', 'updatedAt', "ord"]
        }),
      
      });
    if (!role) throw new NotFoundException(' یافت نشد');

    return role;
  }

  async updateRole(data: updateRoleDto): Promise<number>{

    const {id} = data

    let role = await this.roleModel.findByPk(id,{raw:true})
    if(!role) throw new NotFoundException('شناسه معتبر نیست')
    
    let dataObj = this.utilsService.omitNull(data)
   
    let result = await this.roleModel.update(dataObj, {where: {id}})
    if(!result[0]) throw new NotFoundException('نقش یافت نشد')

    return result[0]
  }

  async deleteRole (data: deleteRoleDto): Promise<number>{

    let userRole = await this.userRoleModel.count({where: {roleId: data.id}})
    if(userRole) throw new NotAcceptableException('امکان حذف نقش های دارای کاربر وجود ندارد')

    let result = await this.roleModel.destroy({
      where: { id: data.id },
    });

    if (!result) throw new NotFoundException('نقشی بااین شناسه یافت نشد');
    return result;
  }


  async addRoleFunc(data: addRoleFuncDto): Promise<boolean> {
    const {roleId, funcIds} = data

    let checkFuncs : Func[] = await this.funcModel.findAll({
      where: {
        id : {[Op.in]: funcIds}
      },
      raw: true
    })

    if(checkFuncs.length != funcIds.length) throw new NotFoundException('شناسه برخی فانکشن ها درست نیست')

    let roleFuncs = await this.roleFuncModel.findAll({
      where: {roleId},
      raw: true
    })

    let roleFuncIds = roleFuncs.map(item=> +item.funcId)
    let selectedFuncIds : number[] = checkFuncs.map(item => item.id)
    let excludeFuncIds : number[] = []

    
    excludeFuncIds = roleFuncIds.filter(item => !selectedFuncIds.includes(item))
    let includeFuncIds = selectedFuncIds.filter(item => !roleFuncIds.includes(item))
   

    await this.roleFuncModel.destroy({where: {roleId,funcId: {[Op.in]: excludeFuncIds}}})

    let roleFuncObj:any[] = includeFuncIds.map(item=>{return {roleId, funcId: item}})
   
    
    let result = await this.roleFuncModel.bulkCreate(roleFuncObj)

    await this.setRolesAccessOnRedis()

    return true
    
  }

  async setRolesAccessOnRedis(): Promise<void>{

    let authorizedFunctions = await this.roleModel.findAll({
      include: [
        {
          model: this.funcModel,
          as: 'funcs',
          attributes: ['name'],
          through: { attributes: [] },
          where: {name: {[Op.not]: null}},
         
        },
      ],
      attributes: ['id'],
      raw:true
    }) 
    
    let roleFuncGroups =  _.groupBy(authorizedFunctions, 'id')

    //delete last access
    for (const key in roleFuncGroups) {
      await this.redis.del(`role_${key}_access`)
    }

    for (const key in roleFuncGroups) {
      await this.redis.set(`role_${key}_access`, roleFuncGroups[key].map(e=> e['funcs.name']))
    }

    console.log('roleFuncs set on redis successfully :)');
  }


}
