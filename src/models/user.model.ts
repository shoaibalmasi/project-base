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
  {tableName: 'user'}
)
export class User extends Base {
  @Column({
    allowNull: true,
    type: DataType.STRING(32),
  })
  firstName: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
  })
  lastName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(32),
    unique: true,
  })
  username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  
  status: boolean;

  @BeforeCreate
  @BeforeUpdate
  @BeforeUpsert
  @BeforeBulkCreate
  @BeforeBulkUpdate
  static async hashPassword(user: User){
      if (user.password) {
          console.log(user.password)
        user.password = await bcrypt.hash(user.password.toString(), 10);
      }
  };
}
