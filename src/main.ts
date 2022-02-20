import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  await app.listen(3000);
}
bootstrap();
