import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createCommentDto {
  @ApiProperty({ description: 'متن نظر' })
  @JoiSchema(Joi.string().required())
  text: string;
  
  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه پست', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  postId: number;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;
}

export class commentListDto {
  @ApiProperty({ description: 'شناسه کاربر', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه پست', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  postId: number;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

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

export class commentInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class adminUpdateCommentDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required().allow(null, ''))
  id: number;

  @ApiProperty({ description: 'متن نظر', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  text: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  isActive: boolean;
}


export class AdminCommentListDto {
  @ApiProperty({ description: 'شناسه کاربر', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شناسه محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productId: number;

  @ApiProperty({ description: 'شناسه پست', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  postId: number;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  isActive: boolean;

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
