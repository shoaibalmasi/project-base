import {
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';
import  Base  from './base.model';

@Table({ tableName: 'userRole' })
export default class UserRole extends Base {
  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  userId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  roleId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  networkId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  level: number;
}
