import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createRoleDto {
  @ApiProperty({ description: 'نام نقش' })
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'فعال/غیرفعال', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  status: boolean;
}

export class roleListDto {
  @ApiProperty({ description: 'نام نقش', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'فعال/غیرفعال', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  status: boolean;

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

export class roleInfoDto {
  @ApiProperty({ description: 'شناسه نقش' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class updateRoleDto {
  @ApiProperty({ description: 'شناسه نقش' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'نام نقش', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'فعال/غیرفعال', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  status: boolean;
}

export class deleteRoleDto {
  @ApiProperty({ description: 'شناسه نقش' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class addRoleFuncDto {
  @ApiProperty({ description: 'شناسه نقش' })
  @JoiSchema(Joi.number().required())
  roleId: number;

  @ApiProperty({ description: 'شناسه دسترسی ها' })
  @JoiSchema(Joi.array().items(Joi.number()).required())
  funcIds: number[];
}
