import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from './api/redis-cache/redis-cache.module';
import { UserModule } from './api/user/user.module';
import jwtConfig from 'config/jwtConfig';

@Module({
  imports: [UserModule, RedisCacheModule],
})
export class AppModule {}
