import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Responser } from './responser';

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
  path: string;
  error: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    let request = context.switchToHttp().getRequest();
    let path: string = request.route.path;

    return next.handle().pipe(
      map((data) => {
        return new Responser({ result: data, path });
      }),
    );
  }
}
