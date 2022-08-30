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
    {tableName: 'role'}
  )
  export class Role extends Base {
    @Column({
      allowNull: false,
      type: DataType.STRING(64),
    })
    name: string;
  
    @Column({
      allowNull: true,
      type: DataType.TEXT,
    })
    description: string;
  
    @Column({
      allowNull: false,
      type: DataType.BOOLEAN,
      defaultValue: false
    })
    status: boolean;
  }
  