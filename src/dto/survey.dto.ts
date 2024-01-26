import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

interface AnswerSheet {
  questionId: number
  answer: number
}

export class surveyInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createSurveyDto {

  @ApiProperty({ description: 'پاسخ سوالات'})
  @JoiSchema(Joi.array().items({ 
    questionId: Joi.number().required(),
    answer: Joi.number().required()
  }).required())
  answerSheet: AnswerSheet[]

  @ApiProperty({ description: 'نظر', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  comment: string;

  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه فروشگاه',required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

}

export class surveyCommentListDto {

  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

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

export class surveyQuestionsPointDto {

  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;
}

export class addingPossibility {
  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه فروشگاه',required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;
}

export class verifySurveyDto {
  @ApiProperty({ description: 'شناسه نظرسنجی' })
  @JoiSchema(Joi.number().required())
  surveyId: number;

}


export class surveyListDto {
  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه فروشگاه',required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({ description: 'شناسه کاربر',required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'وضعیت',required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

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
