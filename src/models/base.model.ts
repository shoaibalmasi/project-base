import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    paranoid:  true,
})
export class Base extends Model {
    @Column({
        allowNull: true,
        type: DataType.BIGINT,
        comment: 'شناسه مرجع'
      })
    pid : number


    @Column({
        allowNull: true,
        type: DataType.BIGINT,
        comment: 'ترتیب'
      })
    ord : number

   
}