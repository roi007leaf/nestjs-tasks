import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';

import AppModule from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const { port } = process.env.PORT || serverConfig;
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({origin: })
  }

  await app.listen(port);
  logger.log(`Application Listening on port ${port}`);
}
bootstrap();
