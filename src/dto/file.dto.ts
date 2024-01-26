import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class uploadFileDto {
  @ApiProperty({ description: 'شناسه کاربر', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه خودرو', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  carId: number;

  @ApiProperty({ description: 'شناسه دسته بندی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  categoryId: number;

  @ApiProperty({ description: 'شناسه شرکت خودروسازی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyId: number;

  @ApiProperty({ description: 'شناسه پست', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  postId: number;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({ description: 'فیلدی که باید نام فایل در آن ذخیره شود', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  fieldName: number;

  @ApiProperty({ description: 'فایل بند انگشتی ایجاد شود؟' })
  @JoiSchema(Joi.boolean().default(true))
  makeThumbnail: boolean;
}

export class jimpFunctionDto {
  @ApiProperty({ description: 'کیفیت' })
  @JoiSchema(Joi.number().default(65))
  quality: number;

  @ApiProperty({ description: 'کیفیت' })
  @JoiSchema(Joi.number().default(300))
  width: number;

  @ApiProperty({ description: 'عرض' })
  @JoiSchema(Joi.number().default(200))
  height: number;

  @ApiProperty({ description: 'تصویر' })
  @JoiSchema(Joi.string().required())
  image: string;
}

export class uploadStoreDocsDto {

  @ApiProperty({ description: 'فایل یند انگشتی ایجاد شود؟' })
  @JoiSchema(Joi.boolean().default(true))
  makeThumbnail: boolean;
}
