import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import db from 'config/db';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'config/jwtConfig';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private redis: RedisCacheService,
  ) {}

  async login(data): Promise<object> {
    const { username, password } = data;

    let user = db.find(
      (item) => item.password == password && item.username == username,
    );

    if (!user)
      throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');

    let payload = {
      id: user.id,
      username: user.username,
      expireIn: 60,
    };

    let accessToken = this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: '60s',
    });

    await this.redis.set(`accessToken_${user.id}`, accessToken, '60');

    return { accessToken };
  }

  async logout(userId): Promise<object> {
    await this.redis.del(`accessToken_${userId}`);
    return { success: true };
  }

  async info(data): Promise<object> {
    return { data };
  }
}
