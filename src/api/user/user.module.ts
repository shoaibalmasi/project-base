import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UtilsService } from 'src/api/utils/utils.service';
import {
  File,
  Network,
  Role,
  User,
  UserRole,
} from 'src/models';
import { UserAddress } from 'src/models/userAddress.model';
import { AdminUserService } from './admin-user.service';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Network,
      Role,
      UserRole,
      UserAddress,
      File,
    ]),
  ],
  providers: [
    userService,
    UtilsService,
    AdminUserService,
  ],
  controllers: [
    UserController,
    AdminUserController,
  ],
})
export class UsersModule {}
