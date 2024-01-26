import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  createMenuDto,
  updateMenuDto,
  deletedMenuDto,
} from 'src/dto/menu.dto';
import { Func } from 'src/models/func.model';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import { RoleFunc } from 'src/models';
import { UtilsService } from 'src/api/utils/utils.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Func)
    private funcModel: typeof Func,
    @InjectModel(RoleFunc)
    private roleFuncModel: typeof RoleFunc,

    private utilsService: UtilsService,
  ) {}

  async getMenuList(data: { service: string; roleId: number }): Promise<any> {
    const { service, roleId } = data;

    let where = roleId == +process.env.SUPER_ADMIN_ROLE_ID ? {} : { roleId };
    let funcList = [];

    if (roleId == +process.env.SUPER_ADMIN_ROLE_ID) {

      
      funcList = await this.funcModel.findAll({
        where: { service },
        attributes: ['id', 'pid','ord', ['name','link'], ['description','title'], 'service', 'icon',"category"],
        raw: true,
      });

      
    } else {
      let menulist = await this.roleFuncModel.findAll({
        where,
        attributes: [],
        include: [
          {
            model: this.funcModel,
            as: 'func',
            required: true,
            where: { service },
            attributes: ['id', 'pid','ord', 'name', 'description', 'service', 'icon', "category"],
          },
        ],
        raw: true,
      });

      funcList = menulist.map((e) => {

        return {
          id: e['func.id'],
          pid: e['func.pid'],
          link: e['func.name'] ,
          title: e['func.description'],
          service: e['func.service'],
          icon: e['func.icon'],
          ctegory: e.pid ?  null : e['func.category']
        };
      });
     
    }
   
    
    if(!funcList.length) return []
    let nestedResult = await this.utilsService.createNestedObject({ inputArray: funcList });

    return nestedResult;
  }

  async addMenu(data: createMenuDto): Promise<insertInterface> {
    let dataobj = this.utilsService.omitNull(data);


    let refactorData = {
      name:  dataobj.link ,
      category: dataobj.category || null, 
      description: dataobj.title,
      icon : dataobj.icon || null,
      service: dataobj.service,
      pid: dataobj.pid || null,
      ord: dataobj.ord || null
    }

   
    let checkFunc = await this.funcModel.findOne({
      where: { name: refactorData.name },
      raw: true,
    });

    
    if (checkFunc) throw new ConflictException('نام یا دسته بندی منو تکراری است');

    let menu = await this.funcModel.create(this.utilsService.omitNull(refactorData));
  
    
    return { id: menu.id };
  }

  async menuInfo(id: number): Promise<Func> {
    let menu = await this.funcModel.findByPk(id, { raw: true });
    if (!menu) throw new NotFoundException(' یافت نشد');

    return menu;
  }

  async updateMenu(data: updateMenuDto): Promise<number> {
    const { id } = data;

    let refactorData = {
      name:  data.link || null,
      category: data.category || null, 
      description: data.title,
      icon : data.icon || null,
      service: data.service,
      pid: data.pid || null,
      ord: data.ord || null
    }

    if (refactorData.name) {
      let menu = await this.funcModel.findOne({
        where: { name: refactorData.name, id: { [Op.ne]: id } },
        raw: true,
      });

      if (menu) throw new ConflictException('نام منو نمیتواند تکراری باشد');
    }
    let dataObj = this.utilsService.omitNull(refactorData);

    let result = await this.funcModel.update(dataObj, { where: { id, service: {[Op.in]: ['App','Panel']} } });
    if (!result[0]) throw new NotFoundException('منو یافت نشد');

    return result[0];
  }

  async deleteMenu(data: deletedMenuDto): Promise<any> {

    
    const { id, force } = data;

    let children = await this.funcModel.count({ where: { pid: id } });
    if (children)
      throw new NotAcceptableException(`ین منو دارای ${children} زیر منو است`);

    let result = await this.funcModel.destroy({
      where: { id, service: { [Op.in]: ['App', 'Panel'] } },
    });

    if (!result) throw new NotFoundException('منو با این شناسه یافت نشد');
    return result;
  }



}
