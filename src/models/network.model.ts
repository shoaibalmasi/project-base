import {
  AfterFind,
  AllowNull,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Base } from './base.model';
import * as path from 'path';
import { INTEGER, STRING } from 'sequelize';
import configuration from 'config/configuration';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'ساختار شبکه',
})
export class Network extends Base {
  @Column({
    allowNull: false,
    type: DataType.STRING(64),
    comment: 'شبکه',
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'سطح',
  })
  level: number;

  @Column({
    allowNull: true,
    type: DataType.ARRAY(INTEGER),
    comment: 'آرایه والدها',
  })
  parents: Array<number>;

  @Column({
    allowNull: true,
    type: DataType.ARRAY(STRING),
    comment: 'نام والدها',
  })
  parentsName: Array<number>;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'نوع',
  })
  type: string

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'نام فایل اصلی',
  })
  fileName: string;

  @BeforeCreate
  @BeforeUpdate
  @BeforeUpsert
  @BeforeBulkCreate
  @BeforeBulkUpdate
  static async updateType(network: Network){
    
     if(network.level == 2) network.type = 'استان'
     if(network.level == 3) network.type = 'شهر'
     if(network.level == 4) network.type = 'روستا'

  };

  @AfterFind
  static async getHook(data: Network) {
    if (data?.fileName) {
      data['filePath'] = `${configuration.BaseUrl}/api/v1/file/${path.basename(__filename).split('.')[0]}/${data.fileName}`;
      data.fileName = `${configuration.BaseUrl}/api/v1/file/${path.basename(__filename).split('.')[0]}/${data.fileName}`   
     }
  }
}
