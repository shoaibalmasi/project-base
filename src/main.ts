import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from 'config/configuration';
import * as fs from 'fs'
import { TransformInterceptor } from './common/utils/transform.response';
import { AllExceptionsFilter } from './common/filter/allExceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {  logger: ['error', 'warn'],}
    );
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new TransformInterceptor());


  const config = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription(`The ${process.env.PROJECT_NAME} API description`)
    // .addServer('http://37.32.8.13')
    .addServer('http://localhost:8001')
    .setVersion('1.0')
    .addTag(process.env.PROJECT_NAME)
    .addBearerAuth()
    
    .build();
  const document = SwaggerModule.createDocument(app, config);
    let option : SwaggerCustomOptions ={
      swaggerUrl: "api/v1/postman"
    }

   fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
   SwaggerModule.setup('api', app, document, option);
  //commander

  // or, if you only want to print Nest's warnings and errors
  // await CommandFactory.run(AppModule, ['warn', 'error']);
  
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  await app.listen(process.env.PORT,()=>{
    console.log(`*****/app is running on ${configuration.PORT}/*****`);
    
  });
}
bootstrap();
