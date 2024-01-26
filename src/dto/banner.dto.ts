import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class bannerInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteBannerDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createBannerDto {
 
  @ApiProperty({ description: 'عنوان' })
  @JoiSchema(Joi.string().required())
  title: string;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'حداکثر تعداد فایل' })
  @JoiSchema(Joi.number().required())
  maxCount: number;

  @ApiProperty({ description: 'طول' })
  @JoiSchema(Joi.number().allow(null, ''))
  width: number;

  @ApiProperty({ description: 'عرض' })
  @JoiSchema(Joi.number().allow(null, ''))
  height: number;

  @ApiProperty({ description: 'سایز' })
  @JoiSchema(Joi.number().allow(null, ''))
  size: number;
}

export class bannerListDto {
  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'جست و جو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  search: string;

  @ApiProperty({ description: 'شماره صفحه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pageIndex: number;

  @ApiProperty({ description: 'اندازه صفحه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pageSize: number;

  @ApiProperty({ description: 'مرتب کردن براساس', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  sort: string;

  @ApiProperty({ description: 'صعودی/نزولی', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  asc: boolean;

}

export class updateBannerDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'حداکثر تعداد فایل', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  maxCount: number;

  @ApiProperty({ description: 'طول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  width: number;

  @ApiProperty({ description: 'عرض', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  height: number;

  @ApiProperty({ description: 'سایز', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  size: number;
}
