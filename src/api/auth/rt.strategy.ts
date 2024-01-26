// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ForbiddenException, Injectable, Request} from '@nestjs/common';


// @Injectable()
// export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'rt_secret',
//       passReqToCallback: true,
//     });
//   }

//   validate(@Request() req, payload: any): any {
//     const refreshToken = req
//       ?.get('authorization')
//       ?.replace('Bearer', '')
//       .trim();

//    
//     if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

//     return {
//       ...payload,
//       refreshToken,
//     };
//   }
// }
