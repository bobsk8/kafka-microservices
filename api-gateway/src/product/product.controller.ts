import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete, UseGuards, OnModuleInit } from '@nestjs/common';
import { microserviceConfig } from 'src/microserviceConfig';
import { Client, ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CONSTANTS } from 'common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('product')
@ApiBearerAuth()
@Controller('api/product')
export class ProductController implements OnModuleInit {

    @Client(microserviceConfig)
    client: ClientKafka;

    constructor() { }

    onModuleInit() {
        const requestPatterns = [
            CONSTANTS.PRODUCT_TOPICS.CREATE_PRODUCT,
            CONSTANTS.PRODUCT_TOPICS.FIND_ALL_PRODUCTS,
            CONSTANTS.PRODUCT_TOPICS.FIND_ONE_PRODUCT,
            CONSTANTS.PRODUCT_TOPICS.UPDATE_PRODUCT,
            CONSTANTS.PRODUCT_TOPICS.REMOVE_PRODUCT,
        ];
        requestPatterns.forEach(pattern => {
            this.client.subscribeToResponseOf(pattern);
        });
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createProductDto: CreateProductDto) {
        return this.client.send<string>('create-product', JSON.stringify(createProductDto));
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.client.send<string>('findall-products', '');
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id) {
        return this.client.send<string>('findone-product', JSON.stringify({ id }));
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.client.send<string>('update-product', JSON.stringify({ id, updateProductDto }));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id) {
        return this.client.send<string>('remove-product', JSON.stringify({ id }));
    }
}
