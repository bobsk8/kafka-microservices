import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';

import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService],
})
export class ProductModule {}
