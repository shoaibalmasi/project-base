// import {
//   Injectable,
//   BadRequestException,
//   InternalServerErrorException,
//   Inject,
//   HttpException,
// } from '@nestjs/common';
// import { MinioClientService } from 'src/api/minio-client/minio-client.service';
// import { BufferedFile } from 'src/api/minio-client/interfaces/file.interface';
// import { jimpFunctionDto, uploadFileDto, uploadStoreDocsDto } from 'src/dto/file.dto';
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
// import { InjectModel } from '@nestjs/sequelize';
// import { UtilsService } from 'src/api/utils/utils.service';
// import { payloadInterface } from '../auth/interfaces/auth.inteface';
// import * as _ from 'lodash';
// import * as imageThumb from 'image-thumbnail';
// import sizeOf from 'image-size'

// @Injectable()
// export class FileUploadService {
//   constructor(
//     // private minioClientService: MinioClientService,
//     private utilsService: UtilsService,

//     @InjectModel(Product)
//     private productModel: typeof Product,
//     @InjectModel(File)
//     private fileModel: typeof File,
//     @InjectModel(User)
//     private userModel: typeof User,
//     @InjectModel(Network)
//     private networkModel: typeof Network,
//     @InjectModel(Category)
//     private categoryModel: typeof Category,
//     @InjectModel(Car)
//     private carModel: typeof Car,
//     @InjectModel(Company)
//     private companyModel: typeof Company,
//     @InjectModel(Store)
//     private storeModel: typeof Store,
//     @InjectModel(Festival)
//     private festivalModel: typeof Festival,
//   ) {}

//   async uploadSingle(data: {
//     file: BufferedFile;
//     fileInfo: uploadFileDto;
//     payload: payloadInterface;
//   }) {
//     const { file, fileInfo, payload } = data;
//     if (!file) {
//       throw new BadRequestException('ارسال فایل الزامی است');
//     }

//     let info = this.utilsService.omitNull(fileInfo);
//     let bucket: string;
//     let entity = Object.keys(fileInfo).find((item) =>
//       [
//         'carId',
//         'companyId',
//         'categoryId',
//         'postId',
//         'storeId',
//         'productId',
//         'userId',
//         "festivalId"
//       ].includes(item),
//     );

//     if (!entity) {
//       throw new BadRequestException('هر فایل باید متعلق به یک موجودیت باشد');
//     } else {
//       bucket = entity.slice(0, entity.length - 2);
//     }

//     //upload file
//     let uploaded_image = await this.minioClientService.upload(file, bucket);
//     if (!uploaded_image || !uploaded_image.minioId || !uploaded_image.url)
//       throw new BadRequestException('خطا در آپلود فایل');
//     console.log({uploaded_image},'**************1************');

//     //upload thumbnail
//     if (fileInfo.makeThumbnail) {
//       let thumb = await this.thumbCreator({ file });

//       let uploaded_thumb = await this.minioClientService.uploadThumbnail(
//         thumb.file,
//         bucket,
//         uploaded_image.name.split('.')[0] + '_thumbnail' + uploaded_image.ext,
//         thumb.mimetype,
//       );
//       if (!uploaded_thumb || !uploaded_thumb.name)
//         throw new BadRequestException('خطا در آپلود فایل بند انگشتی');
//     }

//  console.log({uploaded_image},'**************2************');
//     try {
//       //save file in db
//       let savedFile = await this.fileModel.create({
//         ...info,
//         ..._.omit(uploaded_image, 'url'),
//         name: uploaded_image.name + uploaded_image.ext,
//         registrarId: payload.id,
//         type: 1,
//         size: (file.size/1000).toFixed(2),
//         height: sizeOf(file.buffer).height,
//         width: sizeOf(file.buffer).width,
//         bucket,
//         hasThumbnail: fileInfo.makeThumbnail ? true : false
//       });

      
//        let fieldName = fileInfo?.fieldName 
//       if (fieldName) {
//         await this[`${bucket}Model`].update(
//           { [`${fieldName}`]: uploaded_image.name + uploaded_image.ext },
//           { where: { id: fileInfo[`${bucket}Id`] } },
//         );

//         // if(bucket != 'product'){

//         //   await this.minioClientService.delete()
//         // }
//       }
//     } catch (error) {
//       console.log({ error });
//       throw new InternalServerErrorException('خطا در ثبت اطلاعات فایل');
//     }

//     return {...uploaded_image, name: uploaded_image.name + uploaded_image.ext};
//   }

//   async uploadMany(data: {
//     files: any;
//     fileInfo: uploadFileDto;
//     payload: payloadInterface;
//   }) {
//     const { files, fileInfo, payload } = data;
//     let finalResult = [];
//     for (let i = 0; i < files.files.length; i++) {
//       let file = files.files[i];
//       let result = await this.uploadSingle({ file, fileInfo, payload });

//       finalResult.push(result);
//     }

//     return finalResult;
//   }

//   async thumbCreator(data) {
//     const { file, percentage = 10, width = 3000, height = 3000 } = data;

//     try {
//       const thumbnail = await imageThumb(file.buffer, {
//         percentage,
//         // width,
//         // height,
//         responseType: 'base64',
//       });

//       return {
//         mimetype: file.mimetype,
//         file: Buffer.from(thumbnail, 'base64'),
//       };
//     } catch (err) {
//       console.error({ err });
//       throw new InternalServerErrorException('خطا در ایجاد فابل بندانگشتی');
//     }
//   }

//   async frontUpload(data) {
//     const { file, payload } = data;
//     if (file.originalname.split('.').slice(-1) != 'zip')
//       throw new HttpException('فایل ارسال شده معتبر نیست', 400);

//     if (file.size > 50000000)
//       throw new HttpException('حجم فابل بیش از مقدار مجاز است', 400);

//     // await exec(`cd ${configuration.frontend.distDirectory}`)
//     // console.log('1');
//     // await exec(`zip -r distBackup.zip frontBackup`)
//     // console.log('2');
//     // await exec('cd dist')
//     // console.log('3');
//     // await exec('rm -rf ./*')
//     // console.log('4');
//     // await exec('unzip dist.zip -d dist')
//     console.log('finishd');

//     return true;
//   }

//   async uploadStoreDocs(data: {
//     file: BufferedFile;
//     fileInfo: uploadStoreDocsDto;
//     payload: payloadInterface;
//   }) {
//     const { file, fileInfo, payload } = data;
//     if (!file) {
//       throw new BadRequestException('ارسال فایل الزامی است');
//     }

//     let info = this.utilsService.omitNull(fileInfo);
//     let bucket: string = 'store';
   
//     //upload file
//     let uploaded_image = await this.minioClientService.upload(file, bucket);
//     if (!uploaded_image || !uploaded_image.minioId || !uploaded_image.url)
//       throw new BadRequestException('خطا در آپلود فایل');

//     //upload thumbnail
//     if (fileInfo.makeThumbnail) {
//       let thumb = await this.thumbCreator({ file });

//       let uploaded_thumb = await this.minioClientService.uploadThumbnail(
//         thumb.file,
//         bucket,
//         uploaded_image.name.split('.')[0] + '_thumbnail' + uploaded_image.ext,
//         thumb.mimetype,
//       );
//       if (!uploaded_thumb || !uploaded_thumb.name)
//         throw new BadRequestException('خطا در آپلود فایل بند انگشتی');
//     }

//     try {
//       //save file in db
//       let savedFile = await this.fileModel.create({
//         ...info,
//         ..._.omit(uploaded_image, 'url'),
//         name: uploaded_image.name + uploaded_image.ext,
//         registrarId: payload.id,
//         type: 1,
//         size: (file.size/1000).toFixed(2),
//         height: sizeOf(file.buffer).height,
//         width: sizeOf(file.buffer).width,
//         bucket,
//         hasThumbnail: fileInfo.makeThumbnail ? true : false
//       });

//     } catch (error) {
//       console.log({ error });
//       throw new InternalServerErrorException('خطا در ثبت اطلاعات فایل');
//     }

//     return {...uploaded_image, name: uploaded_image.name + uploaded_image.ext};
//   }

//   async uploadBannerFile(data: {
//     file: BufferedFile;
//     bannerId: number;
//     payload: payloadInterface;
//   }){

//     const { file} = data;
//     if (!file) 
//       throw new BadRequestException('ارسال فایل الزامی است');
//     const bucket = 'banner'

//      //upload file
//      let uploaded_image = await this.minioClientService.upload(file, bucket);
//      if (!uploaded_image || !uploaded_image.minioId || !uploaded_image.url)
//        throw new BadRequestException('خطا در آپلود فایل');

//       return uploaded_image
//   }
// }
