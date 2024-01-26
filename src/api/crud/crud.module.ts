import { Module } from '@nestjs/common';
import { UtilsService } from 'src/api/utils/utils.service';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
  providers: [CrudService, UtilsService],
   exports: [CrudService ],
   controllers: [CrudController],
})
export class CrudModule {}