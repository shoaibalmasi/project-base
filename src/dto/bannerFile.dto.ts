import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

/// Admin Dto
export class bannerFileInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteBannerFileDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createBannerFileDto {
  @ApiProperty({ description: 'شناسه بنر' })
  @JoiSchema(Joi.number().required())
  bannerId: number;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

}

export class adminBannerFileListDto {
  @ApiProperty({
    description: `وضعیت
    0: غیرفعال
    1: فعال`,
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'شناسه گروه بنر', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  bannerId: number;

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

export class updateBannerFileDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'عنوان', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  title: string;

  @ApiProperty({
    description: `وضعیت
    0: غیرفعال
    1: فعال`,
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;
}

////user Dtos

export class bannerFileListDto {
  @ApiProperty({ description: 'شناسه گروه بنر' })
  @JoiSchema(Joi.number().allow(null, ''))
  bannerId: number;
}
