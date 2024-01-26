import { IsNotEmpty, IsEnum } from 'class-validator';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export enum productType {
  other = 0,
  pycsical = 1,
}

export enum productStatus {
  deactive = 0,
  active = 1,
}

export enum productVerifyStatus {
  requestSent = 0,
  needToCorrection = 1,
  verified = 2,
  storeIsBlocked = 3,
  userIsRemoved = 4,
}

export class productInfoDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class deleteProductDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;
}

export class createProductDto {
  @ApiProperty({ description: 'نام محصول' })
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'موجودی انبار' })
  @JoiSchema(Joi.number().required())
  stock: number;

  @ApiProperty({ description: 'حداقل تعداد مجاز فروش', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  minAllowedForSale: number;

  @ApiProperty({ description: 'قیمت اصلی' })
  @JoiSchema(Joi.number().required())
  price: number;

  @ApiProperty({ description: 'قیمت نمایشی' })
  @JoiSchema(Joi.number().required())
  displayPrice: number;

  @ApiProperty({ description: 'شناسه شبکه' })
  @JoiSchema(Joi.number().required())
  networkId: number;

  @ApiProperty({ description: 'شناسه دسته بندی' })
  @JoiSchema(Joi.number().required())
  categoryId: number;

  @ApiProperty({ description: 'شناسه خودرو' })
  @JoiSchema(Joi.number().required())
  carId: number;

  // @JoiSchema(Joi.string().required().description('شناسه فایل اصلی'))
  // fileName: string;

  @ApiProperty({ description: 'موقعیت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  location: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().valid(0, 1).allow(null, ''))
  status: productStatus;

  @ApiProperty({ description: 'نوع محصول', required: false })
  @JoiSchema(Joi.number().valid(0, 1).allow(null, ''))
  type: productType;

  @ApiProperty({ description: 'مشخصات فنی', required: false })
  @JoiSchema(
    Joi.array()
      .items({
        prop: Joi.string().required().description('عنوان ویژگی'),
        value: Joi.string().required().description('مقدار ویژگی'),
      })
      .allow(null, ''),
  )
  technicalProps: Array<object>;

  @ApiProperty({ description: 'کد محصول', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  productCode: string;

  @ApiProperty({ description: 'گارانتی', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  hasWarranty: boolean;

  @ApiProperty({ description: 'اصالت کالا', required: false })
  @JoiSchema(Joi.boolean().allow(null, ''))
  isOriginal: boolean;

  @ApiProperty({description: 'حداقل تعداد برای گرفتن تخفیف ویژه', required: false})
  @JoiSchema(Joi.number().allow('', null))
  minCountToGetSpecialOff : Number;

  @ApiProperty({description: 'قیمت محصول با تخفیف ویژه', required: false})
  @JoiSchema(Joi.number().allow('', null))
  specialPrice : Number;

  @ApiProperty({description: '(روز)حداکثر زمان تحویل', required: false})
  @JoiSchema(Joi.number().allow('', null))
  maxDeliveryTime : Number;

  @ApiProperty({description: 'حداقل تعداد برای محاسبه با قیمت دوم', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price2MinCount : Number;

  @ApiProperty({description: 'قیمت دوم محصول', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price2 : Number;

  @ApiProperty({description: 'حداقل تعداد برای محاسبه با قیمت دوم', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price3MinCount : Number;

  @ApiProperty({description: 'قیمت سوم محصول', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price3 : Number;

}

export class productListDto {
  @ApiProperty({ required: false, description: 'نام محصول' })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ required: false, description: 'توضیحات' })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ required: false, description: 'ابتدای بازه قیمتی' })
  @JoiSchema(Joi.number().allow(null, ''))
  priceFrom: number;

  @ApiProperty({ required: false, description: 'انتهای بازه قیمتی' })
  @JoiSchema(Joi.number().allow(null, ''))
  priceTo: number;

  @ApiProperty({ required: false, description: 'شناسه صاحب محصول' })
  @JoiSchema(Joi.string().allow(null, ''))
  userId: string;

  @ApiProperty({ required: false, description: 'شناسه فروشگاه' })
  @JoiSchema(Joi.string().allow(null, ''))
  storeId: string;

  @ApiProperty({ required: false, description: 'شناسه شبکه' })
  @JoiSchema(Joi.string().allow(null, ''))
  networkId: string;

  @ApiProperty({ required: false, description: 'شناسه دسته بندی' })
  @JoiSchema(Joi.string().allow(null, ''))
  categoryId: string;

  @ApiProperty({ required: false, description: 'شناسه خودرو' })
  @JoiSchema(Joi.string().allow(null, ''))
  carId: string;

  @ApiProperty({ required: false, description: 'شناسه شرکت خودروسازی' })
  @JoiSchema(Joi.string().allow(null, ''))
  companyId: string;

  @ApiProperty({ required: false, description: 'وضعیت' })
  @JoiSchema(Joi.string().allow(null, ''))
  status: string;

  @ApiProperty({ required: false, description: 'نوع محصول' })
  @JoiSchema(Joi.string().allow(null, ''))
  type: string;

  @ApiProperty({ required: false, description: 'وضعیت تایید ادمین' })
  @JoiSchema(Joi.allow(null, ''))
  verifyStatus: string;

  @ApiProperty({ required: false, description: 'موجود در انبار' })
  @JoiSchema(Joi.boolean().allow(null, ''))
  stock: boolean;

  @ApiProperty({ required: false, description: 'دارای تخفیف' })
  @JoiSchema(Joi.boolean().allow(null, ''))
  withOff: boolean;

  @ApiProperty({ required: false, description: 'تخفیف شناسه جشنواره' })
  @JoiSchema(Joi.string().allow(null, ''))
  festivalId: string;

  @ApiProperty({ required: false, description: 'جست و جو' })
  @JoiSchema(Joi.string().allow(null, ''))
  search: string;

  @ApiProperty({ required: false, description: 'شماره صفحه' })
  @JoiSchema(Joi.number().allow(null, ''))
  pageIndex: number;

  @ApiProperty({ required: false, description: 'اندازه صفحه' })
  @JoiSchema(Joi.number().allow(null, ''))
  pageSize: number;

  @ApiProperty({ required: false, description: 'مرتب کردن براساس' })
  @JoiSchema(Joi.string().allow(null, ''))
  sort: string;

  @ApiProperty({ required: false, description: 'صعودی/نزولی' })
  @JoiSchema(Joi.boolean().allow(null, ''))
  asc: boolean;

  @ApiProperty({description:'مرتب سازی رندوم', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  random: boolean;

  @ApiProperty({ description: 'شناسه های محصولات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  ids: string;

  @ApiProperty({ description: 'کد محصول', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  productCode: string;

  @ApiProperty({ description: 'گارانتی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  hasWarranty: string;

  @ApiProperty({ required: false, description: 'دارای تخفیف ویژه' })
  @JoiSchema(Joi.boolean().allow(null, ''))
  specialOff: boolean;
}

export class updateProductDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'نام محصول', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'موجودی انبار', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  stock: number;

  @ApiProperty({ description: 'حداقل تعداد مجاز فروش', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  minAllowedForSale: number;

  @ApiProperty({ description: 'قیمت اصلی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  price: number;

  @ApiProperty({ description: 'قیمت نمایشی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  displayPrice: number;

  @ApiProperty({ description: 'شناسه شبکه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  networkId: number;

  @ApiProperty({ description: 'شناسه دسته بندی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  categoryId: number;

  @ApiProperty({ description: 'شناسه خودرو', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  carId: number;

  // @JoiSchema(Joi.string().allow(null, '').description('شناسه فایل اصلی'))
  // fileName: string;

  @ApiProperty({ description: 'موقعیت', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  location: string;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().valid(0, 1).allow(null, ''))
  status: productStatus;

  @ApiProperty({ description: 'نوع محصول', required: false })
  @JoiSchema(Joi.number().valid(0, 1).allow(null, ''))
  type: productType;

  @ApiProperty({ description: 'مشخصات فنی', required: false })
  @JoiSchema(
    Joi.array()
      .items({
        prop: Joi.string().required().description('عنوان ویژگی'),
        value: Joi.string().required().description('مقدار ویژگی'),
      })
      .allow(null, ''),
  )
  technicalProps: Array<object>;

  @ApiProperty({ description: 'کد محصول', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  productCode: string;

  @ApiProperty({ description: 'گارانتی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  hasWarranty: string;

  @ApiProperty({description: 'حداقل تعداد برای گرفتن تخفیف ویژه', required: false})
  @JoiSchema(Joi.number().allow('', null))
  minCountToGetSpecialOff : Number;

  @ApiProperty({description: 'قیمت محصول با تخفیف ویژه', required: false})
  @JoiSchema(Joi.number().allow('', null))
  specialPrice : Number;

  @ApiProperty({description: 'حداقل تعداد برای محاسبه با قیمت دوم', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price2MinCount : Number;

  @ApiProperty({description: 'قیمت دوم محصول', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price2 : Number;

  @ApiProperty({description: 'حداقل تعداد برای محاسبه با قیمت دوم', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price3MinCount : Number;

  @ApiProperty({description: 'قیمت سوم محصول', required: false})
  @JoiSchema(Joi.number().allow('', null))
  price3 : Number;
}

export class ProductverificationDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({ description: 'وضعیت تایید' })
  @JoiSchema(Joi.number().required())
  verifyStatus: productVerifyStatus;
}

export class priceRangeDto {
  @ApiProperty({ description: 'نام محصول', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  name: string;

  @ApiProperty({ description: 'توضیحات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  description: string;

  @ApiProperty({ description: 'شناسه صاحب محصول', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  userId: number;

  @ApiProperty({ description: 'شناسه فروشگاه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  storeId: number;

  @ApiProperty({ description: 'شناسه شبکه', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  networkId: number;

  @ApiProperty({ description: 'شناسه دسته بندی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  categoryId: number;

  @ApiProperty({ description: 'شناسه خودرو', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  carId: number;

  @ApiProperty({ description: 'شناسه شرکت خودروسازی', required: false })
  @JoiSchema(Joi.number().allow(null, ''))
  companyId: number;

  @ApiProperty({ description: 'وضعیت', required: false })
  @JoiSchema(Joi.number().valid(0, 1).allow(null, ''))
  status: productStatus;

  @ApiProperty({ description: 'نوع محصول', required: false })
  @JoiSchema(Joi.number().valid(0, 1).allow(null, ''))
  type: productType;

  @ApiProperty({ description: 'جست و جو', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  search: string;

  @ApiProperty({ description: 'شناسه های محصولات', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  ids: string;

  @ApiProperty({ description: 'کد محصول', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  productCode: string;

  @ApiProperty({ description: 'گارانتی', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  hasWarranty: string;
}

export class productCompareDto {
  @ApiProperty({ description: 'شناسه های محصولات' })
  @JoiSchema(Joi.string().allow(null, ''))
  ids: string;
}
