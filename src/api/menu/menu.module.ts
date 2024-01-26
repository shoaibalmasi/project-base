import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Func } from 'src/models/func.model';
import { RoleFunc } from 'src/models';
import { UtilsService } from 'src/api/utils/utils.service';



@Module({
  imports: [SequelizeModule.forFeature([Func, RoleFunc])],
  providers: [MenuService, UtilsService],
  controllers: [MenuController],
})
export class MenuModule {}
