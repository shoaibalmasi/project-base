import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import configuration from 'config/configuration';
import { UtilsService } from 'src/api/utils/utils.service';

@Module({
  imports: [
    MinioModule.register(configuration.minioConfig)
  ],
  providers: [MinioClientService, UtilsService],
  exports: [MinioClientService]
})
export class MinioClientModule {}
