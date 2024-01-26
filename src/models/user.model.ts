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
  HasMany,
  BelongsToMany,
  Index
} from 'sequelize-typescript';
import { Base } from './base.model';
import * as bcrypt from 'bcrypt';
import * as path from 'path'
import { Hash } from 'src/common/bcrypt/hash.bcrypt';
import { Role } from './role.model';
import { UserAddress } from './userAddress.model';
import { UserRole } from './userRole.model';
import configuration from 'config/configuration';
// import { UserFavorite } from './userFavorite.model';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'کاربر',
})
export class User extends Base {
  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: 'نام'
  })
  firstName: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: 'نام خانوادگی'
  })
  lastName: string;

  @Index({
    unique: true
  })
  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    comment: 'کدملی'
  })
  nationalId: string;

  @Index({
    unique: true
  })
  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: 'نام کاربری'
  })
  username: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'کلمه عبور'
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'وضعیت'
  })
  status: boolean;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'آخرین نقش'
  })
  lastRoleId : number

  @Column({
    allowNull: true,
    type: DataType.DATEONLY,
    comment: 'تاریخ تولد'
  })
  birthDate: string;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment: `جنسیت:
    0: زن
    1: مرد`
  })
  gender : number

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    comment: 'وضعیت تاهل'
  })
  isMarried: boolean;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'تحصیلات'
  })
  education: string;


  @Index({
    unique: true
  })
  @Column({
    allowNull: false,
    type: DataType.CHAR(11),
    comment: 'شماره تماس'
  })
  cellphone: string
  
  @Index({
    unique: true
  })
  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'ایمیل'
  })
  email: string

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'آیا پروفایل تکمیل شده است؟'
  })
  completeProfile: boolean;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'نام فایل اصلی',
  })
  fileName: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: 'کیف پول'
  })
  wallet : number

  ////relationships

  @BelongsToMany(() => Role, {
    through: { model: () => UserRole },
  })
  roles!: Role[];

  @HasMany(() => UserRole,{
    onDelete: "CASCADE",
  })
  userRole!: UserRole[];

  @HasMany(() => UserAddress,{
    onDelete: "CASCADE",
  })
  addresses: UserAddress[];

  // @HasMany(() => UserFavorite)
  // userFavorite!: UserFavorite[];

  @BeforeCreate
  @BeforeUpdate
  @BeforeUpsert
  @BeforeBulkCreate
  @BeforeBulkUpdate
  static async hashPassword(user: User){
      if (user.password) {
        user.password = await Hash.add(user.password.toString());
      }
  };

  @AfterFind
  static async getHook(data: User) {
    if (data?.fileName) {
      data['filePath'] = `${configuration.BaseUrl}/api/v1/file/${path.basename(__filename).split('.')[0]}/${data.fileName}`;
      data.fileName = `${configuration.BaseUrl}/api/v1/file/${path.basename(__filename).split('.')[0]}/${data.fileName}`   
     }
  }
}
