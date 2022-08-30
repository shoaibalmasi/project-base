import { Module } from '@nestjs/common';
import dbConfig from 'config/db.config';
import { SequelizeModule , SequelizeModuleOptions} from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { Sequelize } from 'sequelize-typescript';
import { Func } from './models/func.model';


@Module({
  imports: [
    
    UserModule,
    
  ],
  providers: [
    {
      provide: "SEQUELIZE",
      useFactory: async (): Promise<Sequelize> => {
        const sequelize = new Sequelize({
              dialect: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'shoaib382',
              database: 'project-base',
        });
        sequelize.addModels([Func]);
        await sequelize.sync();
        return sequelize;
      } ,
    }
  ]
  
})
export class AppModule {}
