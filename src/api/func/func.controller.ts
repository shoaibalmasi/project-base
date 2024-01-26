import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { createFuncDto, updateFuncDto, funcListDto } from 'src/dto/func.dto';
import { FuncService } from './func.service';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Func } from 'src/models';
import { JoiPipe } from 'nestjs-joi';

@Controller('func')
@ApiTags('Func-فانکشن')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FuncController {
  constructor(private FuncService: FuncService) {}

  @Get('/list')
  @ApiOperation({
    description: 'دریافت لیست فانکشن ها',
  })
  @UsePipes(JoiPipe)
  async getFuncList(@Query() data: funcListDto): Promise<any> {
    return await this.FuncService.getFuncList(data);
  }

  @Get('/info')
  @ApiOperation({
    description: 'دریافت اطلاعات فانکشن',
  })
  async funcInfo(@Query('id', ParseIntPipe) id: number): Promise<Func> {
    return await this.FuncService.funcInfo(id);
  }

  @Post('/add')
  @ApiOperation({
    description: 'افزودن فانکشن',
  })
  @UsePipes(JoiPipe)
  async addFunc(@Body() data: createFuncDto): Promise<insertInterface> {
    return await this.FuncService.addFunc(data);
  }

  @Put('/update')
  @ApiOperation({
    description: 'ویرایش فانکشن',
  })
  @UsePipes(JoiPipe)
  async updateFunc(@Body() data: updateFuncDto): Promise<number> {
    return await this.FuncService.updateFunc(data);
  }

  @Get('/sync')
  @ApiOperation({
    description: 'بروز رسانی لیست فانکشن ها',
  })
  async funcsync(): Promise<string> {
    return await this.FuncService.syncFunctions();
  }
}
