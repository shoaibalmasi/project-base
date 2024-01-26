import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export enum questionRefrence {
  product = 'product',
  store = 'store',
}

export class surveyQuestionInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteSurveyQuestionDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createSurveyQuestionDto {

  @ApiProperty({ description: 'ترتیب' })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'متن سوال' })
  @JoiSchema(Joi.string().required())
  text: string;

  @ApiProperty({ description: 'بیشترین امتیاز', required: false })
  @JoiSchema(Joi.number().min(1).allow('',null))
  maxPoint: number;

  @ApiProperty({ description: 'کمترین امتیاز', required: false })
  @JoiSchema(Joi.number().min(1).allow('',null))
  minPoint: number;

  @ApiProperty({
    description: `وضعیت:
      0: غیر فعال
      1: فعال`,
  })
  @JoiSchema(Joi.number().required())
  status: number;

  @ApiProperty({ description: 'مرجع نظرسنجی (product, store)' })
  @JoiSchema(Joi.string().valid('product', 'store').required())
  refrence: questionRefrence;
}

export class surveyQuestionListDto {

  @ApiProperty({ description: 'متن سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  text: string;

  @ApiProperty({
    description: 'مرجع نظرسنجی (product, store)',
    required: false,
  })
  @JoiSchema(Joi.valid('product', 'store').allow(null, ''))
  refrence: questionRefrence;

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

}

export class updateSurveyQuestionDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'متن سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  text: string;

  @ApiProperty({ description: 'بیشترین امتیاز', required: false })
  @JoiSchema(Joi.number().min(1).allow(null, ''))
  maxPoint: number;

  @ApiProperty({ description: 'کمترین امتیاز', required: false })
  @JoiSchema(Joi.number().min(1).allow(null, ''))
  minPoint: number;

  @ApiProperty({
    description: `وضعیت:
      0: غیر فعال
      1: فعال`,
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({
    description: 'مرجع نظرسنجی (product, store)',
    required: false,
  })
  @JoiSchema(Joi.valid('product', 'store').allow(null, ''))
  refrence: questionRefrence;
}

export class adminSurveyQuestionListDto {

  @ApiProperty({ description: 'متن سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  text: string;

  @ApiProperty({
    description: `وضعیت:
      0: غیر فعال
      1: فعال`,
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({
    description: 'مرجع نظرسنجی (product, store)',
    required: false,
  })
  @JoiSchema(Joi.valid('product', 'store').allow(null, ''))
  refrence: questionRefrence;

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
}

