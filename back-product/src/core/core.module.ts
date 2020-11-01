import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/entities/product.entity';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService],
  exports: [ProductService]
})
export class CoreModule { }
