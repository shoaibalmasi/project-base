import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/sequelize';
  import {
    createUserDto,
    deleteUserDto,
    removeAddressDto,
    removeUserRoleDto,
    updateUserDto,
    userAddressAddDto,
    userInfoDto,
    userListDto,
    userRoleAddDto,
  } from 'src/dto/user.dto';
  import { User } from 'src/models/user.model';
  import * as _ from 'lodash';
  import { Op } from 'sequelize';
  import { Role } from 'src/models/role.model';
  import { Network } from 'src/models/network.model';
  import { UserRole } from 'src/models/userRole.model';
  import { UserAddress } from 'src/models/userAddress.model';
  import { UtilsService } from 'src/api/utils/utils.service';
  import { payloadInterface } from '../auth/interfaces/auth.inteface';
  import configuration from 'config/configuration';
  @Injectable()
  export class AdminUserService {
    constructor(
      @InjectModel(User)
      private userModel: typeof User,
      @InjectModel(Role)
      private roleModel: typeof Role,
      @InjectModel(Network)
      private networkModel: typeof Network,
      @InjectModel(UserRole)
      private userRoleModel: typeof UserRole,
      @InjectModel(UserAddress)
      private userAddressModel: typeof UserAddress,
  
      private utilsService: UtilsService,
    ) {}
  
    async getUserList(input: {
      data: userListDto;
      payload: payloadInterface;
    }): Promise<{
      rows: User[];
      count: number;
  }> {
      const { data, payload } = input;
  
      let getListQuery = await this.utilsService.getListQueryCreator({
        data,
        model: this.userModel,
      });
  
      let {where , order, limit, offset} = getListQuery
  
      if(data.birthDateFrom && !data.birthDateTo){
        where = {...where , birthDate: { [Op.gte]: data.birthDateFrom } }
      }
  
      else if(data.birthDateTo && !data.birthDateFrom){
        where = {...where , birthDate: { [Op.lte]: data.birthDateTo }}
  
      }else if(data.birthDateFrom && data.birthDateTo){
        where = {
          ...where,
          [Op.and]: [
            {birthDate: { [Op.lte]: data.birthDateTo }}, 
            {birthDate: { [Op.gte]: data.birthDateFrom }}
          ]}
          
      }
    
      console.log({where});
      
  
      let list = await this.userModel.findAndCountAll({
        where,
        attributes: this.utilsService.getColumnsListByType({
          model: this.userModel,
          omit: ['deletedAt', 'updatedAt']
        }),
        include:[
          {
            model: this.roleModel,
            as: 'roles',
            attributes: ['id', 'name'],
            through: { attributes: [['id', 'userRoleId']] },
          },
        ],
        // raw: true,
        order,
        limit,
        offset,
      });
  
      list.rows = list.rows.map((item) => {
        if(item.fileName){
          item['filePath'] = `${configuration.BaseUrl}/api/v1/file/user/${item.fileName}`;
          item.fileName = `${configuration.BaseUrl}/api/v1/file/user/${item.fileName}`    
  
        }
        return item;
      });
  
      return list;
    }
  
    async addUser(data: {
      createData: createUserDto;
      payload: payloadInterface;
    }): Promise<insertInterface> {
      try {
        const { roleId, networkId } = data.createData;
  
        let role = await this.roleModel.findOne({
          where: { id: roleId, status: true },
          raw: true,
        });
        if (!role) throw new NotFoundException('شناسه نقش معتبر نیست');
  
        let network = await this.networkModel.findByPk(networkId, { raw: true });
        if (!network) throw new NotFoundException('شناسه شبکه معتبر نیست');
  
        let dataObj = this.utilsService.omitNull(data.createData);
        dataObj = _.omit(dataObj, ['roleId', 'networkId']);
  
        dataObj.status =
          data.payload.roleId == +process.env.SUPER_ADMIN_ROLE_ID ? true : false;
  
        let user = await this.userModel.create(dataObj);
  
        await this.userRoleModel.create({
          userId: user.id,
          networkId,
          roleId,
          level: network.id,
        });
        return { id: user.id };
      } catch (error) {
        if (error.original && error.original.code == 23505) {
          let fieldDesc;
          switch (Object.keys(error.fields)[0]) {
            case 'nationalId':
              fieldDesc = 'کدملی';
              break;
  
            case 'username':
              fieldDesc = 'نام کاربری';
              break;
  
            case 'cellphone':
              fieldDesc = 'شماره همراه';
              break;
  
            case 'email':
              fieldDesc = 'ایمیل';
              break;
  
            default:
              break;
          }
  
          throw new ConflictException(`${fieldDesc} تکراری است`);
        }
        throw new InternalServerErrorException('خطای اجرای منطق یا ذیتابیس');
      }
    }
  
    async userInfo(input: {
      data: userInfoDto;
      payload: payloadInterface;
    }): Promise<User> {
      let { id, role, address } = input.data;
  
      let include = [];
      if (role) {
        include.push({
          model: this.roleModel,
          as: 'roles',
          attributes: ['id', 'name', 'description', 'status'],
          through: { attributes: ['networkId', 'level', 'createdAt',['id', 'userRoleId']] },
        });
      }
  
      if (address) {
        include.push({
          model: this.userAddressModel,
          as: 'addresses',
          attributes: [
            'id',
            'address',
            'postalCode',
            'provinceId',
            'cityId',
            'cityName',
            'provinceName',
            'createdAt',
          ],
        });
      }
  
      let user = await this.userModel.findByPk(id, {
        // raw: true,
        attributes: this.utilsService.getColumnsListByType({
            model: this.userModel,
            omit: ['deletedAt', 'updatedAt']
          }),
        include,
      });
      if (!user) throw new NotFoundException('کاربر یافت نشد');
  
      return user;
    }
  
    async updateUser(input: {data: updateUserDto,  payload: payloadInterface}): Promise<number> {
      const {data, payload} = input
      let { id } = data;
  
      if(payload.roleId != +process.env.SUPER_ADMIN_ROLE_ID && id != payload.id)
      throw new HttpException('شما اجازه ویرایش اطلاعات دیگر کاربران را ندارید',403)
      
      let user = await this.userModel.findByPk(id, { raw: true });
      if (!user) throw new NotFoundException('شناسه کاربر معتبر نیست');
  
      let dataObj = this.utilsService.omitNull(data);
  
      const result = await this.userModel.update(dataObj, { where: { id } , individualHooks: true,});
      this.updateUserProfileComplete({userId: user.id})
      if (!result) throw new NotFoundException('کاربر یافت نشد');
  
  
      return result[0];
    }
  
    async removeUser(data: deleteUserDto):Promise<number> {
      let result = await this.userModel.destroy({
        where: { id: data.id},
      });
  
      
  
      if (!result) throw new NotFoundException('شناسه کاربر معتبر نیست');
      return result;
    }
  
    async userRoleAdd(data: userRoleAddDto): Promise<insertInterface> {
      const { userId, networkId, roleId } = data;
  
      const user = await this.userModel.findOne({
        where: { id: userId, status: true },
        raw: true,
      });
  
      if (!user) throw new NotFoundException('کاربر یافت نشد');
  
      const network = await this.networkModel.findOne({
        where: { id: networkId },
        raw: true,
      });
      if (!network) throw new NotFoundException('شبکه یافت نشد');
  
      const role = await this.roleModel.findOne({
        where: { id: roleId, status: true },
        raw: true,
      });
      if (!role) throw new NotFoundException('نقش یافت نشد');
  
      let result = await this.userRoleModel.create({
        userId,
        networkId,
        roleId,
        level: network.level
      });
  
      return { id: result.id };
    }
  
    async removeUserRole(data: removeUserRoleDto): Promise<number> {
      let result = await this.userRoleModel.destroy({
        where: { id: data.userRoleId},
      });
  
      if (!result) throw new NotFoundException('شناسه نقش یا کاربر معتبر نیست');
      return result;
    }
  
    async getUserRole(payload: payloadInterface): Promise<any> {
      let userRoleList = await this.userRoleModel.findAll({
        where: { userId: payload.id },
        attributes: ['id'],
        include: [
          {
            model: this.roleModel,
            required: true,
            as: 'role',
            attributes: ['id', 'name'],
          },
          {
            model: this.networkModel,
            required: true,
            as: 'network',
            attributes: ['name', 'id'],
          },
        ],
        raw: true,
      });
  
      let list = userRoleList.map((item) => {
        return {
          id : item.id,
          userId: payload.id,
          roleId: item['role.id'],
          roleName: item['role.name'],
          networkId: item['network.id'],
          networkName: item['network.name'],
        };
      });
  
      return list;
    }
  
    async updateUserProfileComplete(data): Promise<void>{
      const {userId} = data
      let completeProfile = false
      let user = await this.userModel.findByPk(userId, {raw:true})
      if(user && 
        user.firstName &&
        user.lastName &&
        user.nationalId &&
        user.birthDate  &&
        user.gender != null &&
        user.isMarried != null &&
        user.education
      ){
        completeProfile = true
      }
  
      await this.userModel.update(
        {completeProfile},
        {where: {id: userId}}
      )
    }
  
  }
  