import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable , Request, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from '../../../privatekey';
import { RedisCacheService } from 'src/api/redis-cache/redis-cache.service';
import { payloadInterface } from 'src/api/auth/interfaces/auth.inteface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(  private redis : RedisCacheService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: payloadInterface) {
    
    let checkAccess = await this.redis.get( `accessToken_${payload.id}`)
    if(!checkAccess) throw new UnauthorizedException('توکن منقضی شده')
   
    return payload;
  }
}