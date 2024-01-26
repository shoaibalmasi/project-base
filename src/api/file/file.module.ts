// import { Module } from '@nestjs/common';
// import { FileUploadService } from './file.service';
// import { FileUploadController } from './file.controller';
// import { MinioClientModule } from 'src/api/minio-client/minio-client.module';
// import { UtilsService } from 'src/api/utils/utils.service';
// import { SequelizeModule } from '@nestjs/sequelize';
// import {
//   Car,
//   Category,
//   Company,
//   Festival,
//   File,
//   Network,
//   Product,
//   Store,
//   User,
// } from 'src/models';

// @Module({
//   imports: [
//     SequelizeModule.forFeature([
//       Product,
//       File,
//       User,
//       Network,
//       Category,
//       Car,
//       Company,
//       Store,
//       Festival
//     ]),
//     // MinioClientModule,
    
//   ],
//   providers: [FileUploadService, UtilsService],
//   controllers: [FileUploadController],
// })
// export class FileUploadModule {}
