import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    paranoid:  true,
})
export class Base extends Model {
    @Column({
        allowNull: true,
        type: DataType.BIGINT,
      })
    pid : number


    @Column({
        allowNull: true,
        type: DataType.BIGINT,
      })
    ord : number

   
}