import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export enum festivalVerifyStatus {
  requestSent = 0,
  needToCorrection = 1,
  verified = 2,
  storeIsBlocked = 3,
  userIsRemoved = 4,
}

export class festivalInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteFestivalDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class festivalVerifyDto {

  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'وضعیت تایید' })
  @JoiSchema(Joi.number().required())
  verifyStatus: festivalVerifyStatus
}

export class createFestivalDto {
  @ApiProperty({description:'عنوان', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'وضعیت'})
  @JoiSchema(Joi.boolean().required())
  status: boolean;

  @ApiProperty({description:'درصد تخفیف'})
  @JoiSchema(Joi.number().required())
  offPercentage: number;

  @ApiProperty({description:'تاریخ شروع'})
  @JoiSchema(Joi.date().required().min('now'))
  startDate: Date;

  @ApiProperty({description:'تاریخ پایان'})
  @JoiSchema(Joi.date().required().min('now'))
  endDate: Date;

  @ApiProperty({description:'شناسه محصولات'})
  @JoiSchema(
    Joi.array().items(Joi.number()).required(),
  )
  productIds: any;
}

export class festivalListDto {
  @ApiProperty({description:'عنوان', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({description:'وضعیت', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  status: boolean;

  @ApiProperty({description:'وضعیت صحت سنجی', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  verifyStatus: festivalVerifyStatus;

  @ApiProperty({description:'شناسه صاحب فروشگاه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({description:'شناسه فروشگاه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({description:'شناسه شبکه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  networkId: number;

  @ApiProperty({description:'تاریخ شروع', required: false})
  @JoiSchema(Joi.date().allow(null, ''))
  startDate: Date;

  @ApiProperty({description:'تاریخ پایان', required: false})
  @JoiSchema(Joi.date().allow(null, ''))
  endDate: Date;

  @ApiProperty({description:'شناسه محصولات', required: false})
  @JoiSchema(
    Joi.array()
      .items(Joi.number())
      .allow(null, ''),
  )
  productIds: any;
 
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

  @ApiProperty({description:'مرتب سازی رندوم', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  random: boolean;
}

export class updateFestivalDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({description:'عنوان', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'وضعیت', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  status: boolean;

  @ApiProperty({description:'وضعیت صحت سنجی', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  verifyStatus: festivalVerifyStatus;

  @ApiProperty({description:'تاریخ شروع', required: false})
  @JoiSchema(Joi.date().allow(null, '').min('now'))
  startDate: Date;

  @ApiProperty({description:'تاریخ پایان', required: false})
  @JoiSchema(Joi.date().allow(null, '').min('now'))
  endDate: Date;

  @ApiProperty({description:'شناسه محصولات', required: false})
  @JoiSchema(
    Joi.array()
      .items(Joi.number())
      .allow(null, '')
  )
  productIds: any;
}
