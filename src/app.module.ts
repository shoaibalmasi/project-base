import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/user/user.module';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AuthModule } from './api/auth/auth.module';
import { RedisCacheModule } from './api/redis-cache/redis-cache.module';
import { NetworkModule } from './api/network/network.module';
import { CrudModule } from './api/crud/crud.module';
import { RoleModule } from './api/role/role.module';
import { FuncModule } from './api/func/func.module';
// import { AppLoggerMiddleware } from './common/middleware/appLogger.middelware';
import { MinioClientModule } from './api/minio-client/minio-client.module';
// import { FileUploadModule } from './api/file/file.module';
import configuration from 'config/configuration';
import { MenuModule } from './api/menu/menu.module';
import { UtilsModule } from './api/utils/utils.module';


@Module({
  imports: [
    UsersModule,
    CrudModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [configuration],
    }),
    SequelizeModule.forRoot(configuration.database as SequelizeModuleOptions),
    // ScheduleModule.forRoot(),
    AuthModule,
    RedisCacheModule,
    NetworkModule,
    RoleModule,
    FuncModule,
    // MinioClientModule,
    // FileUploadModule,
    MenuModule,
    CrudModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [] ,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
