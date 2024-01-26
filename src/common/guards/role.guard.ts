import { Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { payloadInterface } from '../../api/auth/interfaces/auth.inteface';
import { RedisCacheService } from 'src/api/redis-cache/redis-cache.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private redis : RedisCacheService
  ){}
  async canActivate(
    context: ExecutionContext,
  ) : Promise<boolean> {

    let request  =  context.switchToHttp().getRequest()
    let path : string = request.route.path
    let funcName : string = path.replace('/api/v1/','')
    let user : payloadInterface = request.user
    if(user.roleId == +process.env.SUPER_ADMIN_ROLE_ID) return true
    
    let roleFunc = await this.redis.get(`role_${user.roleId}_access`)
    
    if(!roleFunc.includes(funcName)) 
        throw new ForbiddenException(`نقش ${user.roleName} به روند ${funcName} دسترسی ندارد`);
    console.log('roleGaurd = true ================================');
    
    return true;
  }
}
