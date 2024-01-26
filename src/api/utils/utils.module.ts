import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from 'src/models';
import { LogService } from './log.service';
import { UtilsService } from './utils.service';
import { RawQueryservice } from './rawQuery.service';

@Module({
  imports:[
    SequelizeModule.forFeature([Log]),
  ],
  providers: [LogService, UtilsService, RawQueryservice],
  exports: [LogService, UtilsService, RawQueryservice]
})
export class UtilsModule {


}
