import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class createCarDto {
  @ApiProperty({description:'نام'})
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({description:'توضیحات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'شناسه شرکت', required: false})
  @JoiSchema(Joi.number().required())
  companyId: number;

  // @JoiSchema(Joi.string().required().description('نام تصویراصلی'))
  // fileName: string;
}

export class carListDto {
  @ApiProperty({description:'نام', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({description:'توضیحات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description:'شناسه شرکت', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  companyId: number;

  @ApiProperty({description:'جست و جو', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  search: string;

  @ApiProperty({description:'شماره صفحه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pageIndex: number;

  @ApiProperty({description:'اندازه صفحه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pageSize: number;

  @ApiProperty({description:'مرتب کردن براساس', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  sort: string;

  @ApiProperty({description:'صعودی/نزولی', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  asc: boolean;

  @ApiProperty({description:'مرتب سازی رندوم', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  random: boolean;
}

export class carInfoDto {
  @ApiProperty({description: 'شناسه'})
  @JoiSchema(Joi.number().required())
  id: number;
}

export class updateCarDto {
  @ApiProperty({description:'شناسه'})
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({description:'نام', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({description:'توضیحات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({description: 'شناسه شرکت', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  companyId: number;

  // @JoiSchema(Joi.string().allow(null,'').description('نام تصویراصلی'))
  // fileName: string;
}

export class deleteCarDto {
  @ApiProperty({description: 'شناسه'})
  @JoiSchema(Joi.number().required())
  id: number;
}

//Company DTOs====================================================
export class createCompanyDto {
  @ApiProperty({description:'نام'})
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({description:'توضیحات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  // @JoiSchema(Joi.string().required().description('نام تصویراصلی'))
  // fileName: string;
}

export class companyListDto {
 
  @ApiProperty({description:'نام', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  
  @ApiProperty({description:'توضیحات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  
  @ApiProperty({description:'جست و جو', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  search: string;

  
  @ApiProperty({description:'شماره صفحه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pageIndex: number;

  
  @ApiProperty({description:'اندازه صفحه', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  pageSize: number;

  
  @ApiProperty({description:'مرتب کردن براساس', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  sort: string;

  @ApiProperty({description:'صعودی/نزولی', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  asc: boolean;

  @ApiProperty({description:'مرتب سازی رندوم', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  random: boolean;

}

export class companyInfoDto {
  @ApiProperty({description: 'شناسه'})
  @JoiSchema(Joi.number().required())
  id: number;
}

export class updateCompanyDto {
  @ApiProperty({description:'شناسه'})
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({description:'نام', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({description:'توضیحات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  // @JoiSchema(Joi.string().allow(null,'').description('نام تصویراصلی'))
  // fileName: string;
}

export class deleteCompanyDto {
  @ApiProperty({description: 'شناسه'})
  @JoiSchema(Joi.number().required())
  id: number;
}
