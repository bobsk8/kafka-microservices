import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

import { microserviceConfig } from "./microserviceConfig";
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './core/filters/all-exception.filter';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceConfig);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(() => logger.log('Kafka consumer runing'));
}
bootstrap();
