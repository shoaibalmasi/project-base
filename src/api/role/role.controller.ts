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
  Delete,
} from '@nestjs/common';
import {
  createRoleDto,
  updateRoleDto,
  roleListDto,
  addRoleFuncDto,
  deleteRoleDto,
} from 'src/dto/role.dto';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/models';
import { JoiPipe } from 'nestjs-joi';

@Controller('role')
@ApiTags('Role')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
  constructor(private RoleService: RoleService) {}

  @Get('/list')
  @ApiOperation({
    description: 'دریافت لیست نقش ها',
  })
  @UsePipes(JoiPipe)
  async getRoleList(@Query() data: roleListDto): Promise<{
    rows: Role[];
    count: number;
  }> {
    return await this.RoleService.getRoleList(data);
  }

  @Get('/info')
  @ApiOperation({
    description: 'دریافت اطلاعات نقش',
  })
  async roleInfo(@Query('id', ParseIntPipe) id: number): Promise<Role> {
    return await this.RoleService.roleInfo(id);
  }

  @Post('/add')
  @ApiOperation({
    description: 'افزودن نقش',
  })
  @UsePipes(JoiPipe)
  async addRole(@Body() data: createRoleDto): Promise<insertInterface> {
    return await this.RoleService.addRole(data);
  }

  @Put('/update')
  @ApiOperation({
    description: 'ویرایش نقش',
  })
  @UsePipes(JoiPipe)
  async updateRole(@Body() data: updateRoleDto): Promise<number> {
    return await this.RoleService.updateRole(data);
  }

  @Delete('/delete')
  @ApiOperation({
    description: 'حذف  نقش',
  })
  @UsePipes(JoiPipe)
  async deleteRole(@Body() data: deleteRoleDto): Promise<number> { 
    return await this.RoleService.deleteRole(data);
  }

  @Post('/addRoleFunc')
  @ApiOperation({
    description: 'افزودن دسترسی به نقش',
  })
  @UsePipes(JoiPipe)
  async addRoleFunc(@Body() data: addRoleFuncDto): Promise<Boolean> {
    return await this.RoleService.addRoleFunc(data);
  }
}
