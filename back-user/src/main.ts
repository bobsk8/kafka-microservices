import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { microserviceConfig } from "./microserviceConfig";
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceConfig);
  await app.listen(() => logger.log('Kafka consumer runing'));
}
bootstrap();