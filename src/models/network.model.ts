import {
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
import * as bcrypt from 'bcrypt';

@Table(
  {tableName: 'network'}
)
export class Network extends Base {
  @Column({
    allowNull: false,
    type: DataType.STRING(64),
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  level: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  lv1Id: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
  })
  lv1Name: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
  })
  lv2Id: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
  })
  lv2Name: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
  })
  lv3Id: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
  })
  lv3Name: string;
}
