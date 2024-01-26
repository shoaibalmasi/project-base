import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createFuncDto {}

export class funcListDto {
  @ApiProperty({ description: 'نام/لینک', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'نام سرویس', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  service: string;

  @ApiProperty({ description: 'جست و جو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  search: string;

  // @JoiSchema(Joi.number().allow(null,'').description:'شماره صفحه'))
  // pageIndex: number;

  // @JoiSchema(Joi.number().allow(null,'').description:'اندازه صفحه'))
  // pageSize: number;

  // @JoiSchema(Joi.string().allow(null,'').description:'مرتب کردن براساس'))
  // sort: string;

  // @JoiSchema(Joi.boolean().allow(null,'').description:'صعودی/نزولی'))
  // asc: boolean;
}

export class funcInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class updateFuncDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}
