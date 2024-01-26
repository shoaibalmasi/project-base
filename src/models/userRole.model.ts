import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Base } from './base.model';
import { User } from './user.model';
import * as path from 'path'
import { Func } from './func.model';
import { Network } from './network.model';
import { Role } from './role.model';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'کاربر- نقش',
})
export class UserRole extends Base {
  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  @ForeignKey(()=>User)
  userId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  @ForeignKey(()=>Role)
  roleId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  @ForeignKey(() => Network)
  networkId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  level: number;

  @BelongsTo(()=>User)
  user : User

  @BelongsTo(()=>Network)
  network : Network

  @BelongsTo(()=>Role)
  role : Role

}
