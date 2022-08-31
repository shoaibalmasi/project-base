import {
  AllowNull,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Column,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import  Base  from './base.model';
import * as bcrypt from 'bcrypt';

@Table({ tableName: 'func' })
export default class Func extends Base {
//   readonly hasService : true

  @Column({
    allowNull: false,
    type: DataType.STRING(64),
  })
  // @Index({unique: true})
  name: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
  })
  service: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
  })
  method: string;
}
