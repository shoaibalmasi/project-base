import {
  AllowNull,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Base } from './base.model';
import * as path from 'path'
import { Role } from './role.model';
import { RoleFunc } from './roleFunc.model';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'فانکشن',
})
export class Func extends Base {

  // @Index({
  //   unique: true
  // })
  @Column({
    allowNull: false,
    type: DataType.STRING(128),
    comment: 'نام'
  })
  // @Index({unique: true})
  name: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
    comment: 'توضیحات'
  })
  description: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: 'نام سرویس'
  })
  service: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: 'متد'
  })
  method: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'آیکون'
  })
  icon: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'دسته بندی منو'
  })
  category: string;

  //relations

  @BelongsToMany(() => Role, {
    through: { model: () => RoleFunc },
  })
  roles!: Role[];

  @HasMany(() => RoleFunc,{
    onDelete: "CASCADE",
  })
  roleFunc!: RoleFunc[];

}
