import { Module } from '@nestjs/common';
import { FuncService } from './func.service';
import { FuncController } from './func.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Func } from 'src/models/func.model';
import { UtilsService } from 'src/api/utils/utils.service';

@Module({
  imports: [SequelizeModule.forFeature([Func])],
  providers: [FuncService, UtilsService],
  controllers: [FuncController],
})
export class FuncModule {}
