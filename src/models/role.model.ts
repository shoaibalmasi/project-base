import {
    AllowNull,
    BeforeBulkCreate,
    BeforeBulkUpdate,
    BeforeCreate,
    BeforeUpdate,
    BeforeUpsert,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { Base } from './base.model';
  import * as path from 'path'
import { User } from './user.model';
import { UserRole } from './userRole.model';
import { RoleFunc } from './roleFunc.model';
import { Func } from './func.model';
  
  @Table({
    tableName: `${path.basename(__filename).split('.')[0]}`,
    comment: 'نقش',
  })
  export class Role extends Base {
    @Column({
      allowNull: false,
      type: DataType.STRING(64),
      comment: 'نام'
    })
    name: string;
  
    @Column({
      allowNull: true,
      type: DataType.TEXT,
      comment: 'توضیحات'
    })
    description: string;
  
    @Column({
      allowNull: false,
      type: DataType.BOOLEAN,
      defaultValue: false,
      comment: 'وضعیت'
    })
    status: boolean;

    //relationships

    @BelongsToMany(() => User, {
      through: { model: () => UserRole },
    })
    users!: User[];
  
    @HasMany(() => UserRole,{
      onDelete: "CASCADE",
    })
    userRole!: UserRole[];

    @BelongsToMany(() => Func, {
      through: { model: () => RoleFunc },
    })
    funcs!: Func[];
  
    @HasMany(() => RoleFunc,{
      onDelete: "CASCADE",
    })
    roleFunc!: RoleFunc[];
  }
  