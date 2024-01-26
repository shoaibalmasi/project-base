import {
  Body,
  Controller,
  // Request,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  Query,
  Req,
  UsePipes,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import {
  createUserDto,
  deleteUserDto,
  removeAddressDto,
  removeUserRoleDto,
  signInDto,
  updateUserDto,
  userAddressAddDto,
  userInfoDto,
  userListDto,
  userRoleAddDto,
} from 'src/dto/user.dto';
import { userService } from './user.service';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { RolesGuard } from 'src/common/guards/role.guard';
import { User } from 'src/models/user.model';
import { Payload } from 'src/common/decorator/payload.decorator';
import { payloadInterface } from '../auth/interfaces/auth.inteface';
import { JoiPipe } from 'nestjs-joi';
import { UserAddress } from 'src/models/userAddress.model';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: userService) {}

  @Get('/info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'دریافت اطلاعات کاربر',
  })
  @UsePipes(JoiPipe)
  async userInfo(
    @Query() data: userInfoDto,
    @Payload() payload: payloadInterface,
  ): Promise<User> {
    return await this.userService.userInfo({ data, payload });
  }


  @Put('/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'ویرایش کاربر',
  })
  @UsePipes(JoiPipe)
  async updateUser(
    @Body() data: updateUserDto,
    @Payload() payload: payloadInterface,
  ): Promise<number> {
    return await this.userService.updateUser({ data, payload });
  }


  @Get('/getUserRole')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'دریافت لیست نقش ها',
  })
  @UsePipes(JoiPipe)
  async getUserRole(@Payload() payload: payloadInterface): Promise<any> {
    return await this.userService.getUserRole(payload);
  }

  @Post('/addAddress')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'افزودن آدرس کاربر',
  })
  @UsePipes(JoiPipe)
  async addAddress(
    @Body() data: userAddressAddDto,
    @Payload() payload: payloadInterface,
  ): Promise<UserAddress> {
    return await this.userService.addUserAddress({ data, payload });
  }

  @Delete('/removeAddress')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'حذف آدرس کاربر',
  })
  @UsePipes(JoiPipe)
  async removeaddress(
    @Body() data: removeAddressDto ,
    @Payload() payload: payloadInterface,
  ): Promise<any> {


    return this.userService.removeAddress({data, payload});
  }

}
