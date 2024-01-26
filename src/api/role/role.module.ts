import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Func, RoleFunc, Role, UserRole } from 'src/models';
import { UtilsService } from 'src/api/utils/utils.service';



@Module({
  imports: [SequelizeModule.forFeature([Role,Func, RoleFunc, UserRole])],
  providers: [RoleService, UtilsService],
  controllers: [RoleController],
})
export class RoleModule {}
