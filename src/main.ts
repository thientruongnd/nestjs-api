import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('this is bootstrap to add middleware HERE ');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // add middleware HERE
  await app.listen(3000);
}
/**
 How to generate a module
 nest g module "Module name"
 We have 2 entires: User and Note, 1 User can write many Notes, 1 Note can be written by many Users
 - controller is where to receive requests from client
 - service is where to do business logic
 - module is where to import controller and AuthService
 - Prisma = dependency with connect to dB using ORM (Object Relational Mapping)
 - Now add a module named "prisma" to import and use it
 * */
bootstrap();
