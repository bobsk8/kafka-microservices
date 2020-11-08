import { Controller, Logger } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CONSTANTS } from 'common';

import { ProductService } from 'src/product/product.service';
import { microserviceConfig } from 'src/microserviceConfig';

@Controller('product')
export class ProductController {
    private readonly logger = new Logger(ProductController.name);
    constructor(private readonly productService: ProductService) { }

    @Client(microserviceConfig)
    client: ClientKafka;

    @MessagePattern(CONSTANTS.PRODUCT_TOPICS.CREATE_PRODUCT)
    handleCreateProduct(@Payload() payload: any): Promise<any> {
        const { createProductDto } = JSON.parse(payload.value);
        this.logger.log('handleCreateProduct', JSON.stringify(payload));
        return this.productService.create(createProductDto);
    }

    @MessagePattern(CONSTANTS.PRODUCT_TOPICS.FIND_ALL_PRODUCTS)
    handleProductFindAll(): Promise<any[]> {
        this.logger.log('handleProductFindAll');
        return this.productService.findAll();
    }

    @MessagePattern(CONSTANTS.PRODUCT_TOPICS.FIND_ONE_PRODUCT)
    handleProductFindOne(@Payload() payload: any): Promise<any> {
        const { id } = JSON.parse(payload.value);
        this.logger.log('handleProductFindOne', JSON.stringify(payload));
        return this.productService.findOne(id);
    }

    @MessagePattern(CONSTANTS.PRODUCT_TOPICS.UPDATE_PRODUCT)
    handleProductUpdate(@Payload() payload: any): Promise<any> {
        const { id, updateProductDto } = JSON.parse(payload.value);
        this.logger.log('handleProductUpdate', JSON.stringify(payload));
        return this.productService.update(id, updateProductDto);
    }

    @MessagePattern(CONSTANTS.PRODUCT_TOPICS.REMOVE_PRODUCT)
    handleProductRemove(@Payload() payload: any): Promise<any> {
        const { id } = JSON.parse(payload.value);
        this.logger.log('handleProductRemove', JSON.stringify(payload));
        return this.productService.remove(id);
    }
}
