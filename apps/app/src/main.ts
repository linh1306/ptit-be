import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/exception/app.exception';
import { PrismaExceptionFilter } from './common/exception/prisma.exception';
import {
  PipeException,
  PipeExceptionFilter,
} from './common/exception/pipe.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => new PipeException(errors),
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new PipeExceptionFilter());

  await app.listen(8000);
}
bootstrap();
