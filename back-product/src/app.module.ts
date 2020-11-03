import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entities/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
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
    }),
    ProductModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
