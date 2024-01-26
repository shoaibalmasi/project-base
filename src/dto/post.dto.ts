import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class postInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deletePostDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createPostDto {
  @ApiProperty({ description: 'عنوان' })
  @JoiSchema(Joi.string().required())
  title: string;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().required())
  description: string;

  @ApiProperty({ description: 'متن پست' })
  @JoiSchema(Joi.string().required())
  content: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'شناسه دسته بندی محصولات' })
  @JoiSchema(Joi.number().allow(null, ''))
  categoryId: number;

  @ApiProperty({ description: 'شناسه دسته بندی های بلاگ' })
  @JoiSchema(Joi.number().required())
  blogCategoryId: number;
}

export class postListDto {

  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'متن پست', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  content: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'وضعیت صحت سنجی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  verifyStatus: number;

  @ApiProperty({ description: 'شناسه  نویسنده', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شناسه دسته بندی محصولات', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  categoryId: number;

  @ApiProperty({ description: 'شناسه دسته بندی های بلاگ', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  blogCategoryId: number;

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

export class updatePostDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'متن پست', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  content: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'شناسه  نویسنده', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شناسه دسته بندی محصولات', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  categoryId: number;

  @ApiProperty({ description: 'شناسه دسته بندی های بلاگ', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  blogCategoryId: number;

}

export class postVerifyDto {
    @ApiProperty({ description: 'شناسه' })
    @JoiSchema(Joi.number().required())
    id: number;

    @ApiProperty({ description: 'وضعیت صحت سنجی' })
    @JoiSchema(Joi.number().required())
    verifyStatus: number;
}

export class postLikeDto {
    @ApiProperty({ description: 'شناسه' })
    @JoiSchema(Joi.number().required())
    id: number;
  }