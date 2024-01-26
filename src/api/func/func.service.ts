import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  createFuncDto,
  updateFuncDto,
  funcInfoDto,
  funcListDto,
} from 'src/dto/func.dto';
import { Func } from 'src/models/func.model';
// import { FuncController } from './func.controller';
import * as _ from 'lodash';
import * as fs from 'fs/promises';
import * as path from 'path';
import { UtilsService } from 'src/api/utils/utils.service';

@Injectable()
export class FuncService {
  constructor(
    @InjectModel(Func)
    private funcModel: typeof Func,

    private utilsService: UtilsService,
  ) {}

  async getFuncList(data: funcListDto): Promise<any> {
    let getListQuery = await this.utilsService.getListQueryCreator({
      data,
      model: this.funcModel,
      omitInSearch: ['icon'],
    });

    const { where, order, limit, offset } = getListQuery;

    let list = await this.funcModel.findAndCountAll({
      where,
      attributes: this.utilsService.getColumnsListByType({
        model: this.funcModel,
        omit: ['deletedAt', 'updatedAt'],
      }),
      raw: true,
    });

    let grouped = _.groupBy(list.rows, 'service');

    return grouped;
  }

  async addFunc(data: createFuncDto): Promise<insertInterface> {
    let dataObj = this.utilsService.omitNull(data);
    let func = await this.funcModel.create(dataObj);
    return { id: func.id };
  }

  async funcInfo(id: number): Promise<Func> {
    let func = await this.funcModel.findByPk(id, { raw: true });
    if (!func) throw new NotFoundException(' یافت نشد');

    return func;
  }

  async updateFunc(data: updateFuncDto): Promise<number> {
    const { id } = data;

    let func = await this.funcModel.findByPk(id, { raw: true });
    if (!func) throw new NotFoundException('شناسه معتبر نیست');

    let dataObj = this.utilsService.omitNull(data);

    const result = await this.funcModel.update(dataObj, { where: { id } });
    if (!result[0]) throw new NotFoundException('فانکشن یافت نشد');

    return result[0];
  }

  async syncFunctions(): Promise<string> {
    let swaggerFile = JSON.parse(
      await fs.readFile(
        path.join(__dirname, '../../../../swagger-spec.json'),
        'utf-8',
      ),
    );

    let paths: Object = swaggerFile.paths;

    const storedFuncs = await this.funcModel.findAll({ raw: true });

    let funcArray = [];
    for (const key in paths) {
      // let name: string = key.split('/')[3] + '/' + key.split('/')[4];
      let keyArr = key.split('/');
      let first3Elements = keyArr.splice(0, 3);

      let name: string = keyArr.join('/');

      if (!storedFuncs.find((item) => item.name == name)) {
        let method: string = Object.keys(paths[key])[0];
        let description: string = paths[key][method].description;
        let service: string = paths[key][method].operationId
          .split('_')[0]
          .replace('Controller', '');
        funcArray.push({
          name,
          method,
          description,
          service,
        });
      }
    }

    console.dir([funcArray[0],funcArray[1],funcArray[2],funcArray[3],funcArray[4]],{depth: null});

    await this.funcModel.bulkCreate(funcArray);
    return 'successfull:)';
  }
}
