import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class commonQuestionInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteCommonQuestionDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createCommonQuestionDto {

  @ApiProperty({ description: 'متن سوال' })
  @JoiSchema(Joi.string().required())
  text: string;

  @ApiProperty({ description: 'پاسخ سوال' })
  @JoiSchema(Joi.string().required())
  answer: string;

  @ApiProperty({
    description: `وضعیت:
      0: غیر فعال
      1: فعال`,
  })
  @JoiSchema(Joi.number().required())
  status: number;
}

export class commonQuestionListDto {
 
  @ApiProperty({ description: 'متن سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  text: string;

  @ApiProperty({ description: 'پاسخ سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  answer: string;

  @ApiProperty({
    description: `وضعیت:
      0: غیر فعال
      1: فعال`,
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'جست و جو' })
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

export class updateCommonQuestionDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'متن سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  text: string;

  @ApiProperty({ description: 'پاسخ سوال', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  answer: string;

  @ApiProperty({
    description: `وضعیت:
      0: غیر فعال
      1: فعال`,
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;
}
