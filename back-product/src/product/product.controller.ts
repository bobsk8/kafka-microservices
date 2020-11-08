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

    @MessagePattern('create-product')
    handleCreateProduct(@Payload() payload: any): Promise<any> {
        const { createProductDto } = JSON.stringify(payload)['value'];
        this.logger.log('handleCreateProduct', JSON.stringify(payload));
        return this.productService.create(createProductDto);
    }

    @MessagePattern('findall-products')
    handleProductFindAll(): Promise<any[]> {
        this.logger.log('handleProductFindAll');
        return this.productService.findAll();
    }

    @MessagePattern('findone-product')
    handleProductFindOne(@Payload() payload: any): Promise<any> {
        const { id } = JSON.stringify(payload)['value'];
        this.logger.log('handleProductFindOne', JSON.stringify(payload));
        return this.productService.findOne(id);
    }

    @MessagePattern('update-product')
    handleProductUpdate(@Payload() payload: any): Promise<any> {
        const { id, updateProductDto } = JSON.stringify(payload)['value'];
        this.logger.log('handleProductUpdate', JSON.stringify(payload));
        return this.productService.update(id, updateProductDto);
    }

    @MessagePattern('remove-product')
    handleProductRemove(@Payload() payload: any): Promise<any> {
        const { id } = JSON.stringify(payload)['value'];
        this.logger.log('handleProductRemove', JSON.stringify(payload));
        return this.productService.remove(id);
    }
}
