import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { RedisCacheService } from 'src/api/redis-cache/redis-cache.service';
import jwtConfig from 'config/jwtConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redis: RedisCacheService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload) {
    // console.log({payload});

    let checkAccess = await this.redis.get(`accessToken_${payload.id}`);
    if (!checkAccess) throw new UnauthorizedException('توکن منقضی شده');

    return payload;
  }
}
