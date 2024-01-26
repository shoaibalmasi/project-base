import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class blogCategoryInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteBlogCategoryDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createBlogCategoryDto {

  @ApiProperty({ description: 'عنوان' })
  @JoiSchema(Joi.string().required())
  title: string;

  @ApiProperty({ description: 'وضعیت' })
  @JoiSchema(Joi.number().required())
  status: number;

}

export class blogCategoryListDto {
 
  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

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

  @ApiProperty({ description: 'مرتب سازی رندوم', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  random: boolean;
}

export class updateBlogCategoryDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

}
