import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { BufferedFile } from './interfaces/file.interface';
import * as crypto from 'crypto';
import configuration from 'config/configuration';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
   
    this.client
      .bucketExists('test')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('test', '');

        console.log('test bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('user')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('user', '');

        console.log('user bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('product')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('product', '');

        console.log('product bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('car')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('car', '');

        console.log('car bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('company')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('company', '');

        console.log('company bucket created.');
      })
      .catch((err) => console.log(err));
    this.client
      .bucketExists('store')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('store', '');

        console.log('store bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('category')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('category', '');

        console.log('category bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('post')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('post', '');

        console.log('post bucket created.');
      })
      .catch((err) => console.log(err));

    this.client
      .bucketExists('banner')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('banner', '');

        console.log('banner bucket created.');
      })
      .catch((err) => console.log(err));

      this.client
      .bucketExists('festival')
      .then(async (res) => {
        if (!res) await this.minio.client.makeBucket('festival', '');

        console.log('festival bucket created.');
      })
      .catch((err) => console.log(err));
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string,
    fileName?: string,
  ) {
    if (!baseBucket) {
      throw new BadRequestException('نام باکت ذخیره سازی فایل را مشخص کنید');
    } else if (!(await this.client.bucketExists(baseBucket))) {
      throw new BadRequestException('نام دسته بندی ذخیره سازی فایل معتبر نیست');
    }

    if (file.size > 3000000) {
      throw new BadRequestException('حجم فایل بیش از حد مجاز است');
    }

    try {
      if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
        throw new HttpException(
          'بارگزاری این فایل مجاز نیست',
          HttpStatus.BAD_REQUEST,
        );
      }
      let ext;
      let hashedFileName;
      if (!fileName) {
        let temp_filename = Date.now().toString();
        hashedFileName = crypto
          .createHash('md5')
          .update(temp_filename)
          .digest('hex');
        ext = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length,
        );
        let filename = hashedFileName + ext;
        fileName = `${filename}`;
      }

      const metaData = {
        'Content-Type': file.mimetype,
      };
      let result = await this.client.putObject(
        baseBucket,
        fileName,
        file.buffer,
        metaData,
      );

      return {
        url: `${configuration.BaseUrl}/api/v1/${baseBucket}/${fileName}`,
        minioId: result.etag,
        name: hashedFileName,
        ext,
        bucket: baseBucket,
        contentType: file.mimetype,
      };
    } catch (error) {
      console.log({ error });

      throw new HttpException('خطا در بارگزاری فایل', HttpStatus.BAD_REQUEST);
    }
  }

  public async delete(objetName: string, baseBucket: string ) {
    try {
       await this.client.removeObject(baseBucket, objetName);

    } catch (error) {
      throw new HttpException(
        'Oops Something wrong happend',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async uploadThumbnail(
    file: any,
    baseBucket: string,
    fileName: string,
    mimetype: string,
  ) {
    if (!baseBucket) {
      throw new BadRequestException('نام باکت ذخیره سازی فایل را مشخص کنید');
    } else if (!(await this.client.bucketExists(baseBucket))) {
      throw new BadRequestException('نام دسته بندی ذخیره سازی فایل معتبر نیست');
    }

    if (file.size > 3000000) {
      throw new BadRequestException('حجم فایل بیش از حد مجاز است');
    }

    try {
      const metaData = {
        'Content-Type': mimetype,
      };
      let result = await this.client.putObject(
        baseBucket,
        fileName,
        file,
        metaData,
      );

      return {
        name: fileName,
      };
    } catch (error) {
      console.log({ error });

      throw new HttpException(
        'خطا در بارگزاری فایل بندانگشتی',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  public async get (objetName: string, baseBucket: string) {
    try {
      const fileContent = await this.client.getObject(baseBucket, objetName);
      return fileContent
      
    } catch (error) {
      throw new HttpException(
        'Oops Something wrong happend',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
