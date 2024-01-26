import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Responser } from '../utils/responser';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
      let status: number;
      let message: string = '';
      let errorText: null;
  
      if (exception instanceof HttpException) {
        const error: any = exception.getResponse().valueOf();
        console.log({exception}); //dont remove this log
  
        message = error?.message;
        status = exception.getStatus();
      } else {
        console.log({exception}); //dont remove this log
        
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorText = exception;
      }
      if (exception?.message) {

        
        message = exception.message;
      }
  
      if(status == 401 ) message = 'لطفا وارد حساب کاربری خود شوید'
      response.status(status).json(
        new Responser({
          success: false,
          status,
          message,
          path: request.url,
          error: errorText,
        }),
      );
    }
  }
  