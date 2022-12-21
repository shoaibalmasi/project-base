import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import jwtConfig from 'config/jwtConfig';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/jwt.strategy';

@Module({
  imports: [RedisCacheModule, JwtModule.register(jwtConfig)],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
