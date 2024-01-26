import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Base } from './base.model';
import * as path from 'path'
import { User } from './user.model';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'آدرس کاربران',
})
export class UserAddress extends Base {
  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  @ForeignKey(() => User)
  userId: number;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  address: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(10),
  })
  postalCode: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  provinceId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  cityId: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  provinceName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  cityName: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  location: string

  @BelongsTo(()=>User)
  user : User

}
