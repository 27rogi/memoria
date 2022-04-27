import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder().setTitle('Memoria').setDescription('Memoria').setVersion('1.0').addTag('memoria').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.use(
    cookieSession({
      keys: [process.env.JWT_SECRET],
    }),
  );
  app.use(helmet());
  // app.use(csurf());
  app.use(morgan('tiny'));
  app.enableCors();
  await app.listen(80);
}
bootstrap();
