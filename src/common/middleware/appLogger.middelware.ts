// import { Injectable, NestMiddleware} from '@nestjs/common';

// import { Request, Response, NextFunction } from 'express';
// import { LogService } from 'src/api/utils/log.service';



// @Injectable()
// export class AppLoggerMiddleware implements NestMiddleware {

//   constructor(
//    private logService: LogService
//   ){}

//   use(request: Request, response: Response, next: NextFunction): void {
//     const startAt = process.hrtime();
//     const { ip, method, path: url, body } = request;
//     const userAgent = request.get('user-agent') || '';


//     // let responseLog =  this.getResponseLog(response);

    
//     response.on('finish', () => {
//       const { statusCode, req, statusMessage } = response;
//       const contentLength = response.get('content-type');
//       const diff = process.hrtime(startAt);
//       const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      
//       let logData = {
//         ip,
//         method,
//         statusCode,
//         agent: userAgent,
//         path: req.url,
//         data: req.body,
//         contentLength,
//         responseTime,
//         payload: response.req.user
        
//       }

//       if(response.req.user)

//       this.logService.saveLog({
//         userId: response.req?.user["id"],
//         roleId: response.req?.user["roleId"],
//         networkId: response.req?.user["networkId"],
//         path: req.url,
//         method,
//         statusCode,
//         duration: responseTime,
//         data: req.body,
//         result: null,
//         error:  statusCode == 200 || statusCode == 202 ? null : statusMessage,
//         ip,
//         agent: userAgent

//       })
   
//     });

//     next();
//   }


//   getResponseLog = (res: Response) => {
//     const rawResponse = res.write;
//     const rawResponseEnd = res.end;
//     const chunkBuffers = [];
//     res.write = (...chunks) => {
//       const resArgs = [];
//       for (let i = 0; i < chunks.length; i++) {
//         resArgs[i] = chunks[i];
//         if (!resArgs[i]) {
//           res.once('drain', res.write);
//           i--;
//         }
//       }
//       if (resArgs[0]) {
//         chunkBuffers.push(Buffer.from(resArgs[0]));
//       }
//       return rawResponse.apply(res, resArgs);
//     };
//     // console.log(`Done writing, beginning res.end`);
//     res.end = (...chunk) => {
//       const resArgs = [];
//       for (let i = 0; i < chunk.length; i++) {
//         resArgs[i] = chunk[i];
//       }
//       if (resArgs[0]) {
//         chunkBuffers.push(Buffer.from(resArgs[0]));
//       }
//       const body = Buffer.concat(chunkBuffers).toString('utf8');
//       res.setHeader('origin', 'restjs-req-res-logging-repo');
//        const responseLog = {
//         response: {
//           statusCode: res.statusCode,
//           body: JSON.parse(body) || body || {},
//           // Returns a shallow copy of the current outgoing headers
//           headers: res.getHeaders(),
//         },
//       };
//       // console.log('res: ', responseLog);
//       rawResponseEnd.apply(res, resArgs);
//       return responseLog as unknown as Response;
//     };
//   };
// }