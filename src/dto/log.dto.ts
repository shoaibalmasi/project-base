import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class saveLogDto {
  @ApiProperty({description:'شناسه کاربر' , required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({description:'شناسه نقش', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  roleId: number;

  @ApiProperty({description:'شناسه شبکه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  networkId: number;

  @ApiProperty({description:'آدرس api'})
  @JoiSchema(Joi.string().required())
  path: string;

  @ApiProperty({description:'متد'})
  @JoiSchema(Joi.string().required())
  method: string;

  @ApiProperty({description:'کد وضعیت'})
  @JoiSchema(Joi.string().required())
  statusCode: number;

  @ApiProperty({description:'زمان پاسخدهی به میلی ثانیه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  duration: number;

  @ApiProperty({description:'داده ارسال شده', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  data: string;

  @ApiProperty({description:'پاسخ موفق دریافت شده', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  result: string;

  @ApiProperty({description:'خطای دریافت شده', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  error: string;

  @ApiProperty({description:'آی پی', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  ip: string;

  @ApiProperty({description:'agent', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  agent: string;


}
