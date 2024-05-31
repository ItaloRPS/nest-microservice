import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/ConflictInterceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { PrismaNotFoundExceptionFilter } from './common/exception-filters/prisma-not-found.exception-filter';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);

 app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
  
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor())
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter())
  await app.listen(3003);
}
bootstrap();
