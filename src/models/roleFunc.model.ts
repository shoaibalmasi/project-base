import {
  BelongsTo,
  ForeignKey,
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';
import { Base } from './base.model';
import * as path from 'path';

import { Func } from './func.model';
import { Role } from './role.model';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'نقش-تابع',
})
export class RoleFunc extends Base {
  @Column({
    allowNull: false,
    type: DataType.BIGINT,
    comment: 'شناسه فانکشن'
  })
  @ForeignKey(() => Func)
  funcId: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
    comment: 'شناسه نقش'
  })
  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Func)
  func: Func;
}
