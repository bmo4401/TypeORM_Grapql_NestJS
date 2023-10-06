import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundErrorFilter } from 'src/school/filters/entity-not-found-error.filer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    /*     logger: ['error', 'warn', 'debug'], //enabled level logger */
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
