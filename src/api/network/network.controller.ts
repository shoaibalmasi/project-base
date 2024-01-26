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
  Delete
} from '@nestjs/common';
import { createNetworkDto, updateNetworkDto, networkListDto, removeNetworkDto } from 'src/dto/network.dto';
import { NetworkService } from './network.service';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Network } from 'src/models';
import { JoiPipe } from 'nestjs-joi';


@Controller('network')
@ApiTags("Network")
export class NetworkController {
  constructor(private NetworkService: NetworkService) {}

  
  @Get('/list')
  @ApiOperation({
    description: "دریافت لیست شبکه",
  
  })
  @UsePipes(JoiPipe)
  async getNetworkList(@Query() data: networkListDto): Promise<{
    rows: Network[];
    count: number;
}> {

    return this.NetworkService.getNetworkList(data);
  }

  
  @Get('/info')
  @ApiOperation({
    description: "دریافت اطلاعات شبکه",
  
  })
  async networkInfo(@Query('id', ParseIntPipe) id: number): Promise<Network> {

    return this.NetworkService.networkInfo(id);
  }

  
  @Post('/add')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiOperation({
    description: "افزودن شبکه",
  
  })
  @UsePipes(JoiPipe)
  async addNetwork(@Body() data: createNetworkDto): Promise<insertInterface> {
    return this.NetworkService.addNetwork(data);
  }

  
  @Put('/update')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiOperation({
    description: "ویرایش شبکه",
  
  })
  @UsePipes(JoiPipe)
  async updateNetwork(@Body() data: updateNetworkDto): Promise<number> {
    return this.NetworkService.updateNetwork(data);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiOperation({
    description: "حذف شبکه",
  
  })
  @UsePipes(JoiPipe)
  async deleteNetwork(@Body() data: removeNetworkDto): Promise<number> {
    return this.NetworkService.deleteNetwork(data.id);
  }

  
}
