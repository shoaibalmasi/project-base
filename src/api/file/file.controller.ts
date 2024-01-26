// import {
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFile,
//   UploadedFiles,
//   UseGuards,
//   Body,
//   UsePipes,
//   Get,
//   Param,
//   Res,
//   Patch
// } from '@nestjs/common';
// import {
//   FileInterceptor,
//   FileFieldsInterceptor,
// } from '@nestjs/platform-express';
// // import { FileUploadService } from './file.service';
// import { BufferedFile } from 'src/api/minio-client/interfaces/file.interface';
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/common/guards/role.guard';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { uploadFileDto, uploadStoreDocsDto } from 'src/dto/file.dto';
// import { Payload } from 'src/common/decorator/payload.decorator';
// import { payloadInterface } from '../auth/interfaces/auth.inteface';
// import { JoiPipe } from 'nestjs-joi';
// import configuration from 'config/configuration';
// import { diskStorage } from 'multer';
// import { MinioClientService } from '../minio-client/minio-client.service';
// import { Response } from 'express';

// @Controller('file')
// @ApiTags('File')
// export class FileUploadController {
//   constructor(
//     private fileUploadService: FileUploadService,
//     private minio : MinioClientService
//     ) {}

//   @Post('single')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @ApiOperation({
//     description: 'آپلود فایل تکی',
//   })
//   @UsePipes(JoiPipe)
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadSingle(
//     @UploadedFile() file: BufferedFile,
//     @Body() fileInfo: uploadFileDto,
//     @Payload() payload: payloadInterface,
//   ) {
//     return await this.fileUploadService.uploadSingle({
//       file,
//       fileInfo,
//       payload,
//     });
//   }

//   @Post('uploadMany')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @ApiOperation({
//     description: 'آپلود فایل گروهی',
//   })
//   @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 4 }]))
//   async uploadMany(
//     @UploadedFiles() files: BufferedFile,
//     @Body() fileInfo: uploadFileDto,
//     @Payload() payload: payloadInterface,
//   ) {
//     return await this.fileUploadService.uploadMany({
//       files,
//       fileInfo,
//       payload,
//     });
//   }

//   @Get('/:bucket/:fileName')
//   @ApiOperation({
//     description: 'دریافت فایل',
//   })
//   async getFile(
//     @Param('bucket') bucket,
//     @Param('fileName') fileName,
//     @Res() res: Response,
//   ) {
//     let result =  await this.minio.get(fileName, bucket)
//      result.pipe(res);
//   }

//   @Post('/storeDocs')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({
//     description: 'بارگزاری مدارک فروشگاه',
//   })
//   @UsePipes(JoiPipe)
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadStoreDocs(
//     @UploadedFile() file: BufferedFile,
//     @Body() fileInfo: uploadStoreDocsDto,
//     @Payload() payload: payloadInterface,
//   ) {
//     return await this.fileUploadService.uploadStoreDocs({
//       file,
//       fileInfo,
//       payload,
//     });
//   }

//   @Patch('/front')
//   @UsePipes(JoiPipe)
//   @UseInterceptors(
//     FileInterceptor('front', {
//       storage: diskStorage({
//         destination:
//           configuration.HOST == 'localhost'
//             ? '/config'
//             : configuration.frontend.distDirectory,
//         filename: (req, file, cb) => {
//           cb(null, `dist.zip`);
//         },
//       }),
//     }),
//   )
//   @ApiOperation({
//     description: 'آپلود فرانت',
//   })
//   async frontUpload(
//     @UploadedFile() file: BufferedFile,
//     // @Body() fileInfo: uploadFileDto,
//     @Payload() payload: payloadInterface,
//   ) {
//     // return await this.fileUploadService.frontUpload({ file, payload });
//   }
// }
