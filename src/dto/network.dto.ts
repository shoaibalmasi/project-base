import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsEnum, Min, NotEquals } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class createNetworkDto {
  @ApiProperty({ description: 'نام' })
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({ description: 'شناسه مرجع' })
  @JoiSchema(Joi.number().required())
  pid: string;

  // @JoiSchema(Joi.string().allow(null,'').description:'نام تصویراصلی'))
  // fileName: string;
}

export class networkListDto {
  @ApiProperty({ description: 'نام', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'سطح', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  level: string;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: string;

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

export class networkInfoDto {}

export class updateNetworkDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'نام', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: string;

  // @JoiSchema(Joi.string().allow(null,'').description:'نام تصویراصلی'))
  // fileName: string;
}

export class removeNetworkDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}