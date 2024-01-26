import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class createCategoryDto {
  @ApiProperty({ description: 'نام دسته بندی', required: false })
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({description: 'مشخصات فنی', required: false})
  @JoiSchema(Joi.array().items(Joi.string()).allow(null, ''))
  technicalProps: string[]

}

export class categoryListDto {
  @ApiProperty({ description: 'نام دسته بندی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'سطح', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  level: number;

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

export class categoryInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'مراجع', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  parents: boolean;

  @ApiProperty({ description: 'زیرمجوعه ها', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  children: boolean;
}

export class updateCategoryDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'نام دسته بندی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({description: 'مشخصات فنی', required: false})
  @JoiSchema(Joi.array().items(Joi.string()).allow(null, ''))
  technicalProps: string[]
}
