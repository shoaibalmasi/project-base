import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export enum GrantType {
  password = 'password',
  refresh_token = 'refresh_token',
}
export class createUserDto {
  @ApiProperty({description:'نام ', required: false })
  @JoiSchema(Joi.string().allow(null, ''))
  firstName: string;

  @ApiProperty({description:'نام خانوادگی', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  lastName: string;

  @ApiProperty({description:'کدملی', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(10).max(10))
  nationalId: string;

  @ApiProperty({description:'تاریخ تولد', required: false})
  @JoiSchema(Joi.date().allow(null, ''))
  birthDate: Date;

  @ApiProperty({description:'شماره همراه'})
  @JoiSchema(
    Joi.string()
      .required()
      .regex(/^09[0-9]{9}/)
  )
  cellphone: string;

  @ApiProperty({description:'ایمیل', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  email: string;

  @ApiProperty({description:'نام کاربری'})
  @JoiSchema(Joi.string().required().min(3))
  username: string;

  @ApiProperty({description:'رمز عبور'})
  @JoiSchema(Joi.string().required().min(8))
  password: string;

  @ApiProperty({description:'شناسه نقش'})
  @JoiSchema(Joi.number().required().min(1))
  roleId: number;

  @ApiProperty({description:'شناسه شبکه'})
  @JoiSchema(Joi.number().required().min(1))
  networkId: number;

  // @JoiSchema(Joi.string().allow(null,'').description:'نام تصویراصلی'))
  // fileName: string;
}

export class userListDto {
  @ApiProperty({description:'نام ', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  firstName: string;

  @ApiProperty({description:'نام خانوادگی', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  lastName: string;

  @ApiProperty({description:'کدملی', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(10).max(10))
  nationalId: string;

  @ApiProperty({description:'تاریخ تولد از', required: false})
  @JoiSchema(Joi.date().allow(null, ''))
  birthDateFrom: Date;

  @ApiProperty({description:'تاریخ تولد تا', required: false})
  @JoiSchema(Joi.date().allow(null, ''))
  birthDateTo: Date;

  @ApiProperty({description:'شماره همراه', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  cellphone: string;

  @ApiProperty({description:'ایمیل', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  email: string;

  @ApiProperty({description:'نام کاربری', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(3))
  username: string;

  @ApiProperty({description:'وضعیت', required: false})
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

export class userInfoDto {
  @ApiProperty({ description: 'شناسه', required: false })
  @JoiSchema(Joi.number().allow(null,''))
  id: number;

  @ApiProperty({description:'نقش'})
  @JoiSchema(Joi.boolean().required())
  role: boolean;

  @ApiProperty({description:'آدرس'})
  @JoiSchema(Joi.boolean().required())
  address: boolean;
}

export class updateUserDto {
  @ApiProperty({ description: 'شناسه' })
  @JoiSchema(Joi.number().required())
  id: number;

  @ApiProperty({description:'نام ', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  firstName: string;

  @ApiProperty({description:'نام خانوادگی', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  lastName: string;

  @ApiProperty({description:'کدملی', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(10).max(10))
  nationalId: string;

  @ApiProperty({description:'تاریخ تولد', required: false})
  @JoiSchema(Joi.date().allow(null, ''))
  birthDate: Date;

  @ApiProperty({description:'شماره همراه', required: false})
  @JoiSchema(
    Joi.string()
      .allow(null, '')
      .regex(/^09[0-9]{9}/)
  )
  cellphone: string;

  @ApiProperty({description:'ایمیل', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  email: string;

  @ApiProperty({description:'نام کاربری', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(3))
  username: string;

  @ApiProperty({description:'وضعیت', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  status: boolean;

  @ApiProperty({description:'کلمه عبور', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(3))
  password: string;

  @ApiProperty({description:'تحصیلات', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  education: string;

  @ApiProperty({description:'وضعیت تاهل', required: false})
  @JoiSchema(Joi.boolean().allow(null, ''))
  isMarried: boolean;

  @ApiProperty({ description: 'جنسیت' })
  @JoiSchema(Joi.number().valid(0,1).allow(null, ''))
  gender: number;

  // @JoiSchema(Joi.string().allow(null,'').description:'نام تصویراصلی'))
  // fileName: string;
}

export class signInDto {
  @ApiProperty({description:'نوع ورود'})
  @JoiSchema(
    Joi.string()
      .valid('refresh_token', 'password')
      .required()
  )
  grant_type: GrantType;

  @ApiProperty({description:'نام کاربری', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  username: string;

  @ApiProperty({description:'کلمه عبور', required: false})
  @JoiSchema(Joi.string().allow(null, '').min(3))
  password: string;

  @ApiProperty({description:'شناسه نقش', required: false})
  @JoiSchema(Joi.number().allow(null, '').min(1))
  roleId: number;

  @ApiProperty({description:'رفرش توکن', required: false})
  @JoiSchema(Joi.string().allow(null, ''))
  refresh_token: string;
}

export class deleteUserDto {
  @ApiProperty({description:'شناسه کاربر'})
  @JoiSchema(Joi.number().required().min(1))
  id: number;
}

export class userRoleAddDto {
  @ApiProperty({description:'شناسه کاربر'})
  @JoiSchema(Joi.number().required().min(1))
  userId: number;

  @ApiProperty({description:'شناسه شبکه'})
  @JoiSchema(Joi.number().required().min(1))
  networkId: number;

  @ApiProperty({description:'شناسه نقش'})
  @JoiSchema(Joi.number().required().min(1))
  roleId: number;

}

export class removeUserRoleDto {
  @ApiProperty({description:'شناسه نقش کاربر'})
  @JoiSchema(Joi.number().required().min(1))
  userRoleId: number;
}

export class userAddressAddDto {
  @ApiProperty({description:'شناسه کاربر', required: false})
  @JoiSchema(Joi.number().allow(null, '').min(1))
  userId: number;

  @ApiProperty({description:'شناسه شهر'})
  @JoiSchema(Joi.number().required().min(1))
  cityId: number;

  @ApiProperty({description:'آدرس'})
  @JoiSchema(Joi.string().required())
  address: string;

  @ApiProperty({description:'کدپستی'})
  @JoiSchema(Joi.string().required())
  postalCode: string;

  @ApiProperty({description:'لوکیشن'})
  @JoiSchema(Joi.string().required())
  location: string;
}

export class otpRegisterDto {
  @ApiProperty({description:'شماره همراه'})
  @JoiSchema(
    Joi.string()
      .required()
      .regex(/^09[0-9]{9}/)
  )
  cellphone: string;

  @ApiProperty({description:'شناسه نقش', required: false})
  @JoiSchema(Joi.number().allow(null, ''))
  roleId: string;
}

export class otpLoginDto {
  @ApiProperty({description:'شماره همراه'})
  @JoiSchema(
    Joi.string()
      .required()
      .regex(/^09[0-9]{9}/)
  )
  cellphone: string;

  @ApiProperty({description:'شناسه نقش'})
  @JoiSchema(Joi.number().required())
  roleId: number;

  @ApiProperty({description:'کد یک بار مصرف'})
  @JoiSchema(Joi.number().required())
  code: number;
}

export class switchRoleDto {
  @ApiProperty({description:'شناسه نقش کاربر'})
  @JoiSchema(Joi.number().required())
  userRoleId: number;
}

export class removeAddressDto {
  @ApiProperty({description:'شناسه آدرس'})
  @JoiSchema(Joi.number().required())
  id: number;
}

export class addOrRemoveFavoriteDto {
  @ApiProperty({description:'شناسه محصول'})
  @JoiSchema(Joi.number().required())
  productId: number;
}
