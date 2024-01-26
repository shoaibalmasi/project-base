import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Network } from 'src/models/network.model';
import { UtilsService } from 'src/api/utils/utils.service';
import { File } from 'src/models';


@Module({
  imports: [SequelizeModule.forFeature([Network, File])],
  providers: [NetworkService, UtilsService],
  controllers: [NetworkController],
})
export class NetworkModule {}
