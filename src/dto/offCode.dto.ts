import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class offCodeInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteOffCodeDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createOffCodeDto {
 
  @ApiProperty({ description: 'کد تخفیف' })
  @JoiSchema(Joi.string().allow(null, ''))
  code: string;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'تاریخ و ساعت انقضا' })
  @JoiSchema(Joi.date().greater('now').allow(null, ''))
  expDate: Date;

  @ApiProperty({ description: 'حداکثر مبلغ تخفیف' })
  @JoiSchema(Joi.number().allow(null, ''))
  maxOffAmount: number;

  @ApiProperty({ description: 'درصد تخفیف' })
  @JoiSchema(Joi.number().min(1).max(100).required())
  offPercentage: number;

  @ApiProperty({ description: 'حداکثر تعداد استفاده ار این کد' })
  @JoiSchema(Joi.number().min(1).allow(null, ''))
  maxUsage: number;

  @ApiProperty({ description: 'حداقل مبلغ فاکتور برای تخفیف' })
  @JoiSchema(Joi.number().allow(null, ''))
  factorMinPrice: number;

  @ApiProperty({ description: 'فعال/غیر فعال', required: false })
  @JoiSchema(Joi.boolean().allow(null, '').default(true))
  isActive: boolean;
}

export class offCodeListDto {
  @ApiProperty({ description: 'شناسه مرجع', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  pid: number;

  @ApiProperty({ description: 'ترتیب', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ord: number;

  @ApiProperty({ description: 'کد تخفیف', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  code: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({ description: 'تاریخ و ساعت انقضا', required: false })
  @JoiSchema(Joi.date().allow(null, ''))
  expDate: Date;

  @ApiProperty({ description: 'حداکثر مبلغ تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  maxOffAmount: number;

  @ApiProperty({ description: 'درصد تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  offPercentage: number;

  @ApiProperty({
    description: 'حداکثر تعداد استفاده ار این کد',
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  maxUsage: number;

  @ApiProperty({ description: 'تعداد استفاده شده ار این کد', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  numberUsed: number;

  @ApiProperty({
    description: 'حداکثر تعداد مجاز استفاده یک کاربر',
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  maxUserUsage: number;

  @ApiProperty({ description: 'حداقل مبلغ فاکتور برای تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  factorMinPrice: number;

  @ApiProperty({
    description: 'شناسه ایجاد کننده/ویرایش کننده',
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  authorId: number;

  @ApiProperty({ description: 'فعال/غیر فعال', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  isActive: boolean;

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

export class updateOffCodeDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'تاریخ و ساعت انقضا' })
  @JoiSchema(Joi.date().greater('now').allow(null, ''))
  expDate: Date;

  @ApiProperty({ description: 'حداکثر مبلغ تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  maxOffAmount: number;

  @ApiProperty({ description: 'درصد تخفیف' })
  @JoiSchema(Joi.number().min(1).max(100).required())
  offPercentage: number;

  @ApiProperty({ description: 'حداکثر تعداد استفاده ار این کد' })
  @JoiSchema(Joi.number().min(1).allow(null, ''))
  maxUsage: number;

  @ApiProperty({
    description: 'حداکثر تعداد مجاز استفاده یک کاربر',
    required: false,
  })
  @JoiSchema(Joi.number().allow(null, ''))
  maxUserUsage: number;

  @ApiProperty({ description: 'حداقل مبلغ فاکتور برای تخفیف', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  factorMinPrice: number;

  @ApiProperty({ description: 'فعال/غیر فعال', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  isActive: boolean;
}
