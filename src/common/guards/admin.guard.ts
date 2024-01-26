import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { payloadInterface } from '../../api/auth/interfaces/auth.inteface';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request  =  context.switchToHttp().getRequest()
    const allowedRoles = [1]
    let user : payloadInterface = request.user
    
    if(!allowedRoles.includes(user.roleId)) 
    throw new ForbiddenException(`دسترسی این api برای برخی نقش ها محدود شده است`);
    
    return true;
  }
}
