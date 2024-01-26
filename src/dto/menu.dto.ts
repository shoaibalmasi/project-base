import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export enum menuType {
  panel = 'Panel',
  app = 'App',
}

export class createMenuDto {
  @ApiProperty({ description: 'نام (آدرس) منو' })
  @JoiSchema(Joi.string().required())
  link: string;

  @ApiProperty({ description: ' عنوان منو' })
  @JoiSchema(Joi.string().required())
  title: string;

  @ApiProperty({ description: 'دسته بندی منو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  category: string;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'آیکون', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  icon: string;

  @ApiProperty({ description: 'سرویس' })
  @JoiSchema(Joi.string().valid('Panel', 'App'))
  service: menuType;
}

export class menuListDto {
  @ApiProperty({ description: 'سرویس' })
  @JoiSchema(Joi.string().valid('Panel', 'App'))
  service: menuType;
}

export class menuInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class updateMenuDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'نام (آدرس) منو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  link: string;

  @ApiProperty({ description: ' عنوان منو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({ description: 'دسته بندی منو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  category: string;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'آیکون', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  icon: string;

  @ApiProperty({ description: 'سرویس' , required: false})
  @JoiSchema(Joi.string().valid('Panel', 'App').allow(null, ''))
  service: menuType;
}

export class deletedMenuDto {
  @ApiProperty({ description: 'سرویس' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'حذف به همراه زیرمجموعه', required: false })
  @JoiSchema(Joi.boolean().allow(null, '').default(false))
  force: boolean;
}
