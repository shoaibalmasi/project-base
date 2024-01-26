import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import * as path from 'path';

@Table({
  paranoid:  true,
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'لاگ',
})
export class Log extends Model {
  @Column({
    allowNull: false,
    type: DataType.BIGINT,
    comment: 'شناسه کاربر',
  })
  userId: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
    comment: 'شناسه نقش',
  })
  roleId: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
    comment: 'شناسه شبکه',
  })
  networkId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    comment: 'مسیر درخواست',
  })
  path: string

  @Column({
    allowNull: false,
    type: DataType.STRING,
    comment: 'متد',
  })
  method: string

  @Column({
    allowNull: false,
    type: DataType.SMALLINT,
    comment: 'متد',
  })
  statusCode: number

  @Column({
    allowNull: false,
    type: DataType.SMALLINT,
    comment: 'متد',
  })
  duration: number

  @Column({
    allowNull: true,
    type: DataType.JSONB,
    comment: 'دیتای ارسالی',
  })
  data: string

  @Column({
    allowNull: true,
    type: DataType.TEXT,
    comment: 'پاسخ دریافتی',
  })
  result: string

  @Column({
    allowNull: true,
    type: DataType.TEXT,
    comment: 'خطا',
  })
  error: string

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'آی پی',
  })
  ip: string 

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'agent',
  })
  agent: string 


}
