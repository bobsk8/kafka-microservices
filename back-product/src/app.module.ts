import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { Product } from './entities/product.entity';

@Module({
  imports: [CoreModule,
    TypeOrmModule.forRoot({
      logging: true,
      synchronize: true,
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'migration'
      },
      entities: [
        Product
      ]
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
