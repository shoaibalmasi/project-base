import { Module } from '@nestjs/common';
import databaseProviders from 'config/db.config';
import { SequelizeModule , SequelizeModuleOptions} from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { Sequelize } from 'sequelize-typescript';
// import { Func } from './models/func.model';


@Module({
  imports: [
    
    UserModule,
    
  ],
  providers: [
    ...databaseProviders
  ]
  
})
export class AppModule {}
