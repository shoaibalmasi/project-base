import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  Delete,
  UseGuards
} from '@nestjs/common';
import { createMenuDto, updateMenuDto, menuListDto, deletedMenuDto } from 'src/dto/menu.dto';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Func, User } from 'src/models';
import { Payload } from 'src/common/decorator/payload.decorator';
import { payloadInterface } from '../auth/interfaces/auth.inteface';
import { JoiPipe } from 'nestjs-joi';


@Controller('menu')
@ApiTags("Menu")
export class MenuController {
  constructor(private MenuService: MenuService) {}

  
  @Get('/list')
  @ApiOperation({
    description: "دریافت لیست منوها",
  
  })
  @UsePipes(JoiPipe)
  async getMenuList(@Query() data: menuListDto, @Payload() payload: payloadInterface): Promise<Func[]> {

    return this.MenuService.getMenuList({service: data.service, roleId: payload.roleId});
  }

  
  @Get('/info')
  @ApiOperation({
    description: "دریافت اطلاعات منو",
  
  })
  async menuInfo(@Query('id', ParseIntPipe) id: number): Promise<Func> {

    return this.MenuService.menuInfo(id);
  }

  
  @Post('/add')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiOperation({
    description: "افزودن منو",
  
  })
  @UsePipes(JoiPipe)
  async addMenu(@Body() data: createMenuDto): Promise<insertInterface> {
    return this.MenuService.addMenu(data);
  }

  
  @Put('/update')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiOperation({
    description: "ویرایش منو",
  
  })
  @UsePipes(JoiPipe)
  async updateMenu(@Body() data: updateMenuDto): Promise<number> {
    return this.MenuService.updateMenu(data);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiOperation({
    description: "حذف منو",
  
  })
  @UsePipes(JoiPipe)
  async deleteMenu(@Body() data: deletedMenuDto): Promise<number> {
    
    return this.MenuService.deleteMenu(data);
  }


  
}
