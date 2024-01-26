import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export enum storeVerifyStatus {
  requestSent = 0,
  needToCorrection = 1,
  verified = 2,
  blocked = 3,
  userIsRemoved = 4,
}
export class storeInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteStoreDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createStoreDto {
  @ApiProperty({ description: 'نام' })
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'قوانین فروش', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  rules: string;

  @ApiProperty({ description: 'نام مدیر' })
  @JoiSchema(Joi.string().required())
  managerFirstName: string;

  @ApiProperty({ description: 'نام خانوادگی مدیر' })
  @JoiSchema(Joi.string().required())
  managerLastName: string;

  @ApiProperty({ description: 'کدملی' })
  @JoiSchema(Joi.string().required())
  managerNationalId: string;

  @ApiProperty({ description: ' شماره ثابت فروشگاه' })
  @JoiSchema(Joi.string().required())
  phone: string;

  @ApiProperty({ description: ' شماره همراه فروشگاه', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  cellphone: string;

  @ApiProperty({ description: 'کد پستی' })
  @JoiSchema(Joi.string().required())
  postalCode: string;

  @ApiProperty({ description: 'آدرس' })
  @JoiSchema(Joi.string().required())
  address: string;

  @ApiProperty({ description: 'شناسه شبکه' })
  @JoiSchema(Joi.number().required())
  networkId: number;

  @ApiProperty({ description: 'نام فایل اصلی (لوگو)', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  fileName: string;
  
  @ApiProperty({ description: 'لوکیشن', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  location: string;

  @ApiProperty({ description: 'نوع مالکیت' })
  @JoiSchema(Joi.number().required())
  ownershipType: number;

  @ApiProperty({ description: 'شماره کارت' })
  @JoiSchema(Joi.string().required())
  bankCardNumber: string;

  @ApiProperty({ description: 'شماره شبا' })
  @JoiSchema(Joi.string().required())
  shabaNumber: string;

  @ApiProperty({ description: 'تعداد نوع کالاها', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productsTypeCount: number;

  @ApiProperty({ description: 'نوع کالاهای فروش', required: false })
  @JoiSchema(Joi.array().items(Joi.number()).allow(null, ''))
  productsType: number[];

  @ApiProperty({ description: 'آیا شامل مالیات بر ارزش افزوده میشوید؟' , required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  hasTaxCerticate: boolean;

  @ApiProperty({ description: 'تاریخ انقضای گواهی مالیات بر ارزش افزوده', required: false })
  @JoiSchema(Joi.date().allow(null, ''))
  taxCertificateExpire: Date;

  @ApiProperty({ description: 'شناسه فایل گواهی مالیات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  taxCertificateFileName: string;

  @ApiProperty({ description: 'تصویر روی کارت ملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  nationalCardFrontFileName: string;

  @ApiProperty({ description: 'تصویر پشت کارت ملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  nationalCardBackFileName: string;

  @ApiProperty({ description: 'نام شرکت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  companyName: string;

  @ApiProperty({ description: 'نوع شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyType: number;

  @ApiProperty({ description: 'شماره ثبت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyRegistrationCode: number;

  @ApiProperty({ description: 'شناسه ملی شرکت', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  companyNationalCode: number;

  @ApiProperty({ description: 'کد اقتصادی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  economicCode: string;

  @ApiProperty({ description: 'صاحبان حق امضا', required: false })
  @JoiSchema(
    Joi.array()
      .items({
        firstName: Joi.string().required().description('نام'),
        lastName: Joi.string().required().description('نام خانوادگی'),
      })
      .allow(null, ''),
  )
  companyDirectors: Array<Object>;
}

export class storeListDto {
  @ApiProperty({ description: 'نام', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'نام مدیر', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  managerFirstName: string;

  @ApiProperty({ description: 'نام خانوادگی مدیر', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  managerLastName: string;

  @ApiProperty({ description: 'کدملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  managerNationalId: string;

  @ApiProperty({ description: 'شناسه کاربر', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: ' شماره ثابت فروشگاه', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  phone: string;

  @ApiProperty({ description: ' شماره همراه فروشگاه', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  cellphone: string;

  @ApiProperty({ description: 'کد پستی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  postalCode: string;

  @ApiProperty({ description: 'آدرس', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  address: string;

  @ApiProperty({ description: 'شناسه شبکه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  networkId: number;

  @ApiProperty({ description: 'وضعیت صحت سنجی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  verifyStatus: number;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'نوع مالکیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ownershipType: number;

  @ApiProperty({ description: 'آیا شامل مالیات بر ارزش افزوده میشوید؟', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  hasTaxCerticate: boolean;

  @ApiProperty({ description: 'نام شرکت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  companyName: string;

  @ApiProperty({ description: 'نوع شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyType: number;

  @ApiProperty({ description: 'شماره ثبت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyRegistrationCode: number;

  @ApiProperty({ description: 'شناسه ملی شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyNationalCode: number;

  @ApiProperty({ description: 'کد اقتصادی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  economicCode: string;

  @ApiProperty({ description: 'صاحبان حق امضا', required: false })
  @JoiSchema(
    Joi.array()
      .items({
        firstName: Joi.string().required().description('نام'),
        lastName: Joi.string().required().description('نام خانوادگی'),
      })
      .allow(null, ''),
  )
  companyDirectors: Array<Object>;

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

export class updateStoreDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'نام', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'قوانین فروش', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  rules: string;

  @ApiProperty({ description: ' شماره ثابت فروشگاه', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  phone: string;

  @ApiProperty({ description: ' شماره همراه فروشگاه', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  cellphone: string;

  @ApiProperty({ description: 'کد پستی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  postalCode: string;

  @ApiProperty({ description: 'آدرس', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  address: string;

  @ApiProperty({ description: 'شناسه شبکه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  networkId: number;

  // @JoiSchema(Joi.string().allow(null, '').description:'شناسه فایل اصلی'))
  // fileName: string;

  @ApiProperty({ description: 'لوکیشن', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  location: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  status: number;

  @ApiProperty({ description: 'نوع مالکیت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  ownershipType: number;

  @ApiProperty({ description: 'شماره کارت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  bankCardNumber: string;

  @ApiProperty({ description: 'شماره شبا', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  shabaNumber: string;

  @ApiProperty({ description: 'تعداد نوع کالاها', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productsTypeCount: number;

  @ApiProperty({ description: 'نوع کالاهای فروش', required: false })
  @JoiSchema(Joi.array().items(Joi.number()).allow(null, ''))
  productsType: number[];

  @ApiProperty({ description: 'آیا شامل مالیات بر ارزش افزوده میشوید؟', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  hasTaxCerticate: boolean;

  @ApiProperty({ description: 'تاریخ انقضای گواهی مالیات بر ارزش افزوده', required: false })
  @JoiSchema(Joi.date().allow(null, ''))
  taxCertificateExpire: Date;

  @ApiProperty({ description: 'شناسه فایل گواهی مالیات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  taxCertificateFileName: string;

  @ApiProperty({ description: 'تصویر روی کارت ملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  nationalCardFrontFileName: string;

  @ApiProperty({ description: 'تصویر پشت کارت ملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  nationalCardBackFileName: string;

  @ApiProperty({ description: 'نام شرکت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  companyName: string;

  @ApiProperty({ description: 'نوع شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyType: number;

  @ApiProperty({ description: 'شماره ثبت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyRegistrationCode: number;

  @ApiProperty({ description: 'شناسه ملی شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyNationalCode: number;

  @ApiProperty({ description: 'کد اقتصادی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  economicCode: string;

  @ApiProperty({ description: 'صاحبان حق امضا', required: false })
  @JoiSchema(
    Joi.array()
      .items({
        firstName: Joi.string().required().description('نام'),
        lastName: Joi.string().required().description('نام خانوادگی'),
      })
      .allow(null, ''),
  )
  companyDirectors: Array<Object>;
}

export class addStoreRequestDto {
  @ApiProperty({ description: 'نام' })
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({ description: 'توضیحات' })
  @JoiSchema(Joi.string().required())
  description: string;

  @ApiProperty({ description: 'قوانین فروش', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  rules: string;

  @ApiProperty({ description: ' شماره ثابت فروشگاه' })
  @JoiSchema(Joi.string().required())
  phone: string;

  @ApiProperty({description:'ایمیل شرکت', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  email: string;

  @ApiProperty({ description: ' شماره همراه فروشگاه', required: false })
  @JoiSchema(
    Joi.string()
      .allow(null, '')
      .regex(/^09[0-9]{9}/),
  )
  cellphone: string;

  @ApiProperty({ description: 'کد پستی' })
  @JoiSchema(Joi.string().required().length(10))
  postalCode: string;

  @ApiProperty({ description: 'آدرس' })
  @JoiSchema(Joi.string().required())
  address: string;

  @ApiProperty({ description: 'شناسه شبکه' })
  @JoiSchema(Joi.number().required())
  networkId: number;

  @ApiProperty({ description: 'نام فایل اصلی (لوگو)', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  fileName: string;

  @ApiProperty({ description: 'لوکیشن', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  location: string;

  @ApiProperty({ description: 'نوع مالکیت', required: false })
  @JoiSchema(Joi.number().required())
  ownershipType: number;

  @ApiProperty({ description: 'شماره کارت', required: false })
  @JoiSchema(Joi.string().required().min(16))
  bankCardNumber: string;

  @ApiProperty({ description: 'شماره شبا', required: false })
  @JoiSchema(Joi.string().required())
  shabaNumber: string;

  @ApiProperty({ description: 'تعداد نوع کالاها', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  productsTypeCount: number;

  @ApiProperty({ description: 'نوع کالاهای فروش', required: false })
  @JoiSchema(Joi.array().items(Joi.number()).allow(null, ''))
  productsType: number[];

  @ApiProperty({ description: 'آیا شامل مالیات بر ارزش افزوده میشوید؟', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  hasTaxCerticate: boolean;

  @ApiProperty({ description: 'تاریخ انقضای گواهی مالیات بر ارزش افزوده', required: false })
  @JoiSchema(Joi.date().allow(null, ''))
  taxCertificateExpire: Date;

  @ApiProperty({ description: 'شناسه فایل گواهی مالیات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  taxCertificateFileName: string;

  @ApiProperty({ description: 'تصویر روی کارت ملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  nationalCardFrontFileName: string;

  @ApiProperty({ description: 'تصویر پشت کارت ملی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  nationalCardBackFileName: string;

  @ApiProperty({ description: 'نام شرکت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  companyName: string;

  @ApiProperty({ description: 'نوع شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyType: number;

  @ApiProperty({ description: 'شماره ثبت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyRegistrationCode: number;

  @ApiProperty({ description: 'شناسه ملی شرکت', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyNationalCode: number;

  @ApiProperty({ description: 'کد اقتصادی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  economicCode: string;

  @ApiProperty({ description: 'صاحبان حق امضا', required: false })
  @JoiSchema(
    Joi.array()
      .items({
        firstName: Joi.string().required().description('نام'),
        lastName: Joi.string().required().description('نام خانوادگی'),
      })
      .allow(null, ''),
  )
  companyDirectors: Array<Object>;

  @ApiProperty({ description: 'اطلاعات شخصی', required: false })
  @JoiSchema(
    Joi.object().keys({
     
        firstName: Joi.string().required().description('نام'),
        lastName: Joi.string().required().description('نام خانوادگی'),
        nationalId: Joi.string().required().min(10).max(10),
        birthDate: Joi.date().required(),
        gender: Joi.number().valid(0,1).required(),
        isMarried: Joi.boolean().required(),
        education: Joi.string().required()

      })
      .allow(null, '')
  )
  userInfo: Object
}

export class storeVerificationDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'وضعیت تایید' })
  @JoiSchema(Joi.number().required())
  verifyStatus: storeVerifyStatus;
}
