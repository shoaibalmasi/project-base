import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class cartInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteCartDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createCartDto {
  @ApiProperty({description:'شناسه محصول'})
  @JoiSchema(Joi.number().required())
  productId: number;

  @ApiProperty({description:'تعداد', required: false})
  @JoiSchema(Joi.number().allow('', null).min(1))
  count: number;
}

export class cartListDto {
  @ApiProperty({description:'شناسه محصول', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه فاکتور', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  factorId: number;

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

export class updateCartDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({description:'شناسه مرجع', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({description:'ترتیب', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;


  @ApiProperty({description:'شناسه کاربر',  required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({description:'شناسه محصول', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({description:'شناسه فاکتور', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  factorId: number;

  @ApiProperty({description:'تعداد', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  count: number;

  @ApiProperty({description:'قیمت محصول', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  price: number;

  @ApiProperty({description:'قیمت نهایی محصول', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  finalPrice: number;

  @ApiProperty({description:'وضعیت', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  condition: number;
}
