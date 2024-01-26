import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class deleteReminderDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createReminderDto {

  @ApiProperty({ description: 'شناسه محصول'})
  @JoiSchema(Joi.number().required())
  productId: number;

}

export class reminderListDto {

//   @ApiProperty({
//     description: `وضعیت:
//       0:  کالا موجود نشده
//       1: کالا موجود شده
//       2: مشاهده شده توسط کاربر`,
//     required: false,
//   })
//   @JoiSchema(Joi.number().allow(null, ''))
//   status: number;

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
