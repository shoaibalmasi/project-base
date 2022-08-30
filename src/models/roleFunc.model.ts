import {
    Column,
    DataType,
    Table,
  } from 'sequelize-typescript';
  import { Base } from './base.model';
  
  @Table({ tableName: 'roleFunc' })
  export class RoleFunc extends Base {
    @Column({
      allowNull: false,
      type: DataType.BIGINT,
    })
    funcId: number;
  
    @Column({
      allowNull: false,
      type: DataType.BIGINT,
    })
    roleId: number;
  
  
  }
  