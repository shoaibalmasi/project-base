import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'privatekey';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RedisCacheModule } from 'src/api/redis-cache/redis-cache.module';
import { Func, Network, Role, RoleFunc, UserRole } from 'src/models';
import { UtilsService } from 'src/api/utils/utils.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserRole, RoleFunc, Func, Role, Network]),
    PassportModule,
    JwtModule.register(jwtConstants),
    RedisCacheModule,
    UtilsModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
