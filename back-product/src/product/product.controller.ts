import { Controller, Logger } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

import { ProductService } from 'src/product/product.service';
import { microserviceConfig } from 'src/microserviceConfig';

@Controller('product')
export class ProductController {
    private readonly logger = new Logger(ProductController.name);
    constructor(private readonly productService: ProductService) { }

    @Client(microserviceConfig)
    client: ClientKafka;

    @MessagePattern('findall-products')
    handleProductFindAll(@Payload() payload: any): Promise<any[]> {
        this.logger.log('handleProductFindAll', JSON.stringify(payload));
        return this.productService.findAll();
    }

    @MessagePattern('create-product')
    async handleProductCreate(@Payload() payload: any): Promise<any> {
        this.logger.log('handleProductCreate', JSON.stringify(payload));
        return await this.productService.create(payload.value);
    }
}
