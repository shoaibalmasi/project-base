import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class factorInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteFactorDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createFactorDto {
  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'شناسه کاربر' })
  @JoiSchema(Joi.number().required())
  userId: number;

  @ApiProperty({ description: 'شناسه تراکنش', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  transactionId: number;

  @ApiProperty({ description: 'شناسه فروشگاه' })
  @JoiSchema(Joi.number().required())
  storeId: number;

  @ApiProperty({ description: 'شناسه کد تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  codeId: number;

  @ApiProperty({ description: 'وضعیت پرداخت' })
  @JoiSchema(Joi.number().required())
  condition: number;

  @ApiProperty({ description: 'مبلغ کل' })
  @JoiSchema(Joi.number().required())
  sumPrice: number;

  @ApiProperty({ description: 'مبلغ مالیات', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  vatPrice: number;

  @ApiProperty({ description: 'مبلغ تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  offPrice: number;

  @ApiProperty({ description: 'مبلغ قابل پرداخت' })
  @JoiSchema(Joi.number().required())
  payPrice: number;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'تاریخ پرداخت' })
  @JoiSchema(Joi.date().required())
  paidAt: Date;
}

export class factorListDto {
  @ApiProperty({ description: 'شناسه کاربر', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شماره تماس', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  cellphone: number;

  @ApiProperty({ description: 'شناسه تراکنش', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  transactionId: number;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({ description: 'شناسه کد تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  codeId: number;

  @ApiProperty({ description: 'وضعیت پرداخت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  condition: number;

  @ApiProperty({ description: 'تاریخ پرداخت', required: false })
  @JoiSchema(Joi.date().allow(null, ''))
  paidAt: Date;

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

export class updateParentFactorDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'شناسه آدرس کاربر' })
  @JoiSchema(Joi.number().required())
  userAddressId: number;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'نام تحویل گیرنده' })
  @JoiSchema(Joi.string().required())
  transfereeFirstName: string;

  @ApiProperty({ description: 'نام خانوادگی تحویل گیرنده' })
  @JoiSchema(Joi.string().required())
  transfereeLastName: string;

  @ApiProperty({ description: 'شماره تماس تحویل گیرنده' })
  @JoiSchema(Joi.string().required())
  transfereeCellphone: string;

  @ApiProperty({ description: 'کدملی تحویل گیرنده', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  transfereeNationalId: string;
}

export class updateSubFactorDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}
