import { Module } from '@nestjs/common';
import dbConfig from 'config/db.config';
import { SequelizeModule , SequelizeModuleOptions} from '@nestjs/sequelize';


@Module({
  imports: [
    SequelizeModule.forRoot(dbConfig.dataBase as SequelizeModuleOptions),
    
  ],
  
})
export class AppModule {}
