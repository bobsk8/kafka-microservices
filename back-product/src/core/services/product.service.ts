import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: string): Promise<Product> {
        return this.productsRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }
}