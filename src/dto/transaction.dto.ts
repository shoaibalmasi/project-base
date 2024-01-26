import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class transactionInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteTransactionDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createTransactionDto {
  @ApiProperty({description:'شناسه مرجع', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({description:'ترتیب'})
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'شناسه کاربر'})
  @JoiSchema(Joi.number().required())
  userId: number;

  @ApiProperty({description:'شناسه فاکتور'})
  @JoiSchema(Joi.number().required())
  factorId: number;

  @ApiProperty({description:'authority'})
  @JoiSchema(Joi.string().allow(null, ''))
  authority: string;

  @ApiProperty({description:'کد پیگیری بانک'})
  @JoiSchema(Joi.string().allow(null, ''))
  followCode: string;

  @ApiProperty({description:'شماره کارت'})
  @JoiSchema(Joi.string().allow(null, ''))
  cardNumber: string;

  @ApiProperty({description:'قیمت نهایی محصول'})
  @JoiSchema(Joi.number().required())
  finalPrice: number;

  @ApiProperty({description:'نوع تراکنش'})
  @JoiSchema(Joi.number().required())
  type: number;

  @ApiProperty({description:'وضعیت تراکنش'})
  @JoiSchema(Joi.number().required())
  status: number;

  @ApiProperty({description:'تاریخ پرداخت'})
  @JoiSchema(Joi.date().required())
  paidAt: Date;
}

export class transactionListDto {
  @ApiProperty({description:'شناسه مرجع', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({description:'ترتیب'})
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'شناسه کاربر',  required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({description:'شناسه فاکتور'})
  @JoiSchema(Joi.number().allow(null, ''))
  factorId: number;

  @ApiProperty({description:'authority'})
  @JoiSchema(Joi.string().allow(null, ''))
  authority: string;

  @ApiProperty({description:'کد پیگیری بانک'})
  @JoiSchema(Joi.string().allow(null, ''))
  followCode: string;

  @ApiProperty({description:'شماره کارت'})
  @JoiSchema(Joi.string().allow(null, ''))
  cardNumber: string;

  @ApiProperty({description:'قیمت نهایی محصول'})
  @JoiSchema(Joi.number().allow(null, ''))
  finalPrice: number;

  @ApiProperty({description:'نوع تراکنش'})
  @JoiSchema(Joi.number().allow(null, ''))
  type: number;

  @ApiProperty({description:'وضعیت تراکنش'})
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({description:'تاریخ پرداخت'})
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

export class updateTransactionDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({description:'شناسه مرجع', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({description:'ترتیب'})
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'شناسه کاربر',  required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({description:'شناسه فاکتور'})
  @JoiSchema(Joi.number().allow(null, ''))
  factorId: number;

  @ApiProperty({description:'authority'})
  @JoiSchema(Joi.string().allow(null, ''))
  authority: string;

  @ApiProperty({description:'کد پیگیری بانک'})
  @JoiSchema(Joi.string().allow(null, ''))
  followCode: string;

  @ApiProperty({description:'شماره کارت'})
  @JoiSchema(Joi.string().allow(null, ''))
  cardNumber: string;

  @ApiProperty({description:'قیمت نهایی محصول'})
  @JoiSchema(Joi.number().allow(null, ''))
  finalPrice: number;

  @ApiProperty({description:'نوع تراکنش'})
  @JoiSchema(Joi.number().allow(null, ''))
  type: number;

  @ApiProperty({description:'وضعیت تراکنش'})
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({description:'تاریخ پرداخت'})
  @JoiSchema(Joi.date().allow(null, ''))
  paidAt: Date;
}

export class payRequestDto {
  @ApiProperty({description:'شناسه فاکتور'})
  @JoiSchema(Joi.number().required())
  factorId: number;

  @ApiProperty({description:'درگاه پرداخت'})
  @JoiSchema(Joi.string().required())
  paymentGateway: string;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;
}

export class payVerifyDto {
  @ApiProperty({description:'شناسه تراکنش'})
  @JoiSchema(Joi.number().required())
  transactionId: number;

  @ApiProperty({description:'درگاه پرداخت'})
  @JoiSchema(Joi.string().required())
  paymentGateway: string;

  @ApiProperty({description:'شناسه کاربر'})
  @JoiSchema(Joi.number().required())
  userId: number;

  @ApiProperty({description:'مبلغ'})
  @JoiSchema(Joi.number().required())
  price: number;

  @ApiProperty({description:'authority'})
  @JoiSchema(Joi.string().required())
  Authority: string;

  @ApiProperty({description:'وشعیت'})
  @JoiSchema(Joi.string().required())
  Status: string;
}
