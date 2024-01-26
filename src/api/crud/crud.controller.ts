import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, UseGuards, Body } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
// import { FileUploadService } from './file.service';
import { BufferedFile } from 'src/api/minio-client/interfaces/file.interface';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/role.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { uploadFileDto } from 'src/dto/file.dto';
import { Payload } from 'src/common/decorator/payload.decorator';
import { payloadInterface } from '../auth/interfaces/auth.inteface';
import { CrudService } from './crud.service';

@Controller('crud')
@ApiTags("Crud")
@UseGuards(JwtAuthGuard,RolesGuard)
export class CrudController {
  constructor(
    private crudService: CrudService
  ) {}

  @Post('/new')
  @ApiOperation({
    description: "",
  
  })
  async addService(@Body() data: {serviceName: string},): Promise<string> {
    return this.crudService.createModule(data);
  }
}
