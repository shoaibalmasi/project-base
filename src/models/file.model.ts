import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Table,
} from 'sequelize-typescript';
import { Base } from './base.model';
import * as path from 'path';
import { User } from './user.model';
import { Network } from './network.model';

@Table({
  tableName: `${path.basename(__filename).split('.')[0]}`,
  comment: 'فایل ها',
})
export class File extends Base {
  // @Index({
  //   unique: true,
  // })
  @Column({
    allowNull: false,
    type: DataType.STRING,
    comment: 'شناسه  فایل در minio',
  })
  minioId: string;

  @Index({
    unique: true,
  })
  @Column({
    allowNull: false,
    type: DataType.STRING,
    comment: 'نام فایل',
  })
  name: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'نوع فایل',
  })
  type: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: 'نوع فایل',
  })
  contentType: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'نام باکت',
  })
  bucket: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '',
  })
  ext: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'طول',
  })
  width: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'عرض',
  })
  height: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'سایز',
  })
  size: number;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    comment: 'فایل بندانگشتی دارد؟',
  })
  hasThumbnail: boolean;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'شناسه کاربر ثبت کننده',
  })
  @ForeignKey(() => User)
  registrarId: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'شناسه کاربر',
  })
  @ForeignKey(() => User)
  userId: number;

  // @Column({
  //   allowNull: true,
  //   type: DataType.BIGINT,
  //   comment: 'شناسه محصول',
  // })
  // @ForeignKey(() => Product)
  // productId: number;

  // @Column({
  //   allowNull: true,
  //   type: DataType.BIGINT,
  //   comment: 'شناسه دسته بندی های محصول',
  // })
  // @ForeignKey(() => Category)
  // categoryId: number;



 

  // @Column({
  //   allowNull: true,
  //   type: DataType.BIGINT,
  //   comment: 'شناسه فروشگاه',
  // })
  // @ForeignKey(() => Store)
  // storeId: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'شناسه شبکه',
  })
  @ForeignKey(() => Network)
  networkId: number;

  //   @Column({
  //     allowNull: true,
  //     type: DataType.BIGINT,
  //     comment: 'شناسه '
  //   })
  //   @ForeignKey(()=>Post)
  //   postId: number;

  @BelongsTo(() => User)
  user: User;

  // @BelongsTo(() => Product)
  // product: Product;



  // @BelongsTo(() => Category)
  // category: Category;

  @BelongsTo(() => Network)
  network: Network;

  // @BelongsTo(()=>Post)
  // post : Post
}
