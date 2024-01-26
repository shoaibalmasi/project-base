
import * as _ from 'lodash';
import { Op } from 'sequelize';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UtilsService {
  constructor(
    private seq: Sequelize
  ) {}

  omitNull(data: Object): any {
    for (const item in data)
      if (
        (!data[item] &&
          !isNaN(data[item]) &&
          data[item] !== false &&
          data[item] !== 0) ||
        data[item] === undefined
      )
        delete data[item];
    return data;
  }

  getColumnsListByType(data: {
    model: any;
    type?: string;
    omit?: Array<string>;
  }) {
    let { model, type, omit } = data;
    let finalObj = {};
    if (!type) type = '*';
    if (!omit) omit = ['password'];

    for (let key in model.rawAttributes) {
      let type = '';

      switch (model.rawAttributes[key].type.constructor.name) {
        case 'INTEGER':
          type = 'number';
          break;
        case 'BIGINT':
          type = 'number';
          break;

        case 'SMALLINT':
          type = 'number';
          break;

        case 'STRING':
          type = 'string';
          break;

        case 'CHAR':
          type = 'string';
          break;

        case 'VARCHAR':
          type = 'string';
          break;

        case 'TEXT':
          type = 'string';
          break;

        case 'BOOLEAN':
          type = 'boolean';
          break;

        case 'DATE':
          type = 'date';
          break;

        case 'DATEONLY':
          type = 'date';
          break;

        default:
          type = model.rawAttributes[key].type.constructor.name;
          break;
      }

      finalObj[`${key}`] = type;
    }

    if (type != '*') {
      for (let key in finalObj) {
        if (finalObj[key] != type) delete finalObj[key];
      }
    }

    if (omit.length) finalObj = _.omit(finalObj, [...omit]);

    return Object.keys(finalObj);
  }

  async getListQueryCreator(input) {
    let { data, model, defaultLimit, omitInSearch } = input;

    try {
      let dataObj = this.omitNull(
        _.omit(data, ['search', 'pageIndex', 'pageSize', 'sort', 'asc', "random"]),
      );

      let where: any = {};

      if (data.search) {
        let temp = [];
        this.getColumnsListByType({
          model,
          type: 'string',
          omit: omitInSearch,
        }).map((item) => {
          temp.push({ [item]: { [Op.substring]: data.search } });
        });

        where = { [Op.or]: [...temp] };
      }
      for (let key in dataObj) {
        if(Object.keys(model.rawAttributes).includes(key))
        where[key] = dataObj[key];
      }

      if (data.sort && !Object.keys(model.rawAttributes).includes(data.sort))
        throw new BadRequestException(
          'پارامتر وارد شده برای مرتب سازی اشتباه است',
        );

      let order: any = [];
      if (data.sort && data.asc == false) {
        order = [[data.sort, 'DESC']];
      }
      if (data.sort && data.asc == true) {
        order = [[data.sort, 'ASC']];
      }
      if(data.random){
        order = this.seq.random()
      }

      const limit = +data.pageSize || defaultLimit || 20;
      const offset =
        data.pageIndex && data.pageSize
          ? data.pageSize * (data.pageIndex - 1)
          : 0;

      return { where, order, limit, offset };
    } catch (error) {
      throw new BadRequestException(
        error.response.message || 'خطا در ایجاد کوئری دریافت لیست',
      );
    }
  }

  async createNestedObject(data: any) {
    let { inputArray } = data;
    if (inputArray.find((e) => e.children == undefined)) {
      inputArray = await this.removeWithoutParentObject(inputArray);

      inputArray = inputArray.map((item) => {
        return {
          ...item,
          children: [],
        };
      });
    }
    let pids = new Set(inputArray.map((e) => +e.pid));
    let childest = inputArray.filter((item) => !pids.has(item.id));
    if (childest.length) {
      childest.map((elem) => {
        let parentIndex = inputArray.findIndex((item) => item.id == elem.pid);
        if (parentIndex >= 0) {
          inputArray[parentIndex].children = [
            ...inputArray[parentIndex].children,
            elem,
          ];
          inputArray = inputArray.filter((item) => item.id != elem.id);
        }
      });
    }

    if (inputArray.find((e) => e.pid != null))
      return await this.createNestedObject({ inputArray });

    return inputArray;
  }

  async removeWithoutParentObject(data: Array<any>) {
    let ids = data.map((item) => item.id);

    let filteredArray = data.filter(
      (item) => ids.includes(+item.pid) || item.pid == null,
    );

    if (filteredArray.length == data.length) return filteredArray;
    return await this.removeWithoutParentObject(filteredArray);
  }

  convertSequelizeTypeToJsType(seqType): string {
    let jsType = '';
    switch (seqType) {
      case 'INTEGER':
        jsType = 'number';
        break;
      case 'BIGINT':
        jsType = 'number';
        break;

      case 'SMALLINT':
        jsType = 'number';
        break;

      case 'STRING':
        jsType = 'string';
        break;

      case 'CHAR':
        jsType = 'string';
        break;

      case 'VARCHAR':
        jsType = 'string';
        break;

      case 'TEXT':
        jsType = 'string';
        break;

      case 'BOOLEAN':
        jsType = 'boolean';
        break;

      case 'DATE':
        jsType = 'Date';
        break;

      case 'DATEONLY':
        jsType = 'Date';
        break;

      default:
        jsType = 'any';
        break;
    }
    return jsType;
  }
}
