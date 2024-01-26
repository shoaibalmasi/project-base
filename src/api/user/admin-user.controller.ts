import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Query,
    UsePipes,
    UseGuards,
  } from '@nestjs/common';
  import {
    createUserDto,
    deleteUserDto,
    updateUserDto,
    userInfoDto,
    userListDto,
  } from 'src/dto/user.dto';
  import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  import { RolesGuard } from 'src/common/guards/role.guard';
  import { User } from 'src/models/user.model';
  import { Payload } from 'src/common/decorator/payload.decorator';
  import { payloadInterface } from '../auth/interfaces/auth.inteface';
  import { JoiPipe } from 'nestjs-joi';
  import { AdminGuard } from 'src/common/guards/admin.guard';
  import { AdminUserService } from './admin-user.service';
  
  @Controller('admin-user')
  @ApiTags('Admin-User')
  @UseGuards(JwtAuthGuard, RolesGuard, AdminGuard)
  export class AdminUserController {
    constructor(private adminUserService: AdminUserService) {}
  
    @Get('/list')
    @ApiOperation({
      description: 'دریافت لیست کاربران',
    })
    @UsePipes(JoiPipe)
    async getUserList(
      @Query() data: userListDto,
      @Payload() payload: payloadInterface,
    ): Promise<{
      rows: User[];
      count: number;
    }> {
      return await this.adminUserService.getUserList({ data, payload });
    }
  
    @Get('/info')
    @ApiOperation({
      description: 'دریافت اطلاعات کاربر',
    })
    @UsePipes(JoiPipe)
    async userInfo(
      @Query() data: userInfoDto,
      @Payload() payload: payloadInterface,
    ): Promise<User> {
      return await this.adminUserService.userInfo({ data, payload });
    }
  
    @Post('/add')
    @ApiOperation({
      description: 'افزودن کاربر',
    })
    @UsePipes(JoiPipe)
    async addUser(
      @Body() data: createUserDto,
      @Payload() payload: payloadInterface,
    ): Promise<insertInterface> {
      return await this.adminUserService.addUser({
        createData: data,
        payload,
      });
    }
  
    @Put('/update')
    @ApiOperation({
      description: 'ویرایش کاربر',
    })
    @UsePipes(JoiPipe)
    async updateUser(
      @Body() data: updateUserDto,
      @Payload() payload: payloadInterface,
    ): Promise<number> {
      return await this.adminUserService.updateUser({ data, payload });
    }
  
    @Delete('/removeUser')
    @ApiOperation({
      description: 'حذف کاربر',
    })
    @UsePipes(JoiPipe)
    async removeUser(@Body() data: deleteUserDto): Promise<any> {
      return await this.adminUserService.removeUser(data);
    }
  
    // @Post('/userRoleAdd')
    // @ApiOperation({
    //   description: 'افزودن نقش به کاربر',
    // })
    // @UsePipes(JoiPipe)
    // async userRoleAdd(@Body() data: userRoleAddDto): Promise<insertInterface> {
    //   return await this.adminUserService.userRoleAdd(data);
    // }
  
    // @Delete('/removeUserrole')
    // @ApiOperation({
    //   description: 'حذف نقش به کاربر',
    // })
    // @UsePipes(JoiPipe)
    // async removeUserRole(@Body() data: removeUserRoleDto): Promise<any> {
    //   return await this.adminUserService.removeUserRole(data);
    // }
  
    @Get('/getUserRole')
    @ApiOperation({
      description: 'دریافت لیست نقش ها',
    })
    @UsePipes(JoiPipe)
    async getUserRole(@Payload() payload: payloadInterface): Promise<any> {
      return await this.adminUserService.getUserRole(payload);
    }
  
  }
  