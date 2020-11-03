import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductDto } from './create-product.dto';
import { CreateUserDto } from './create-user.dto';
import { microserviceConfig } from './microserviceConfig';

@Controller()
export class AppController {
  constructor() { }

    @Client(microserviceConfig)
    client: ClientKafka;


    onModuleInit() {
        const requestPatterns = [
            'findall-users',
            'create-user',
            'findall-products',
            'create-product'
        ];
        requestPatterns.forEach(pattern => {
            this.client.subscribeToResponseOf(pattern);
        });
    }

    @Get('user')
    getUsers(): Observable<string> {
        return this.client.send<string>('findall-users', '');
    }

    @Post('user')
    createUser(@Body() userDto: CreateUserDto): Observable<string> {
        return this.client.send<string>('create-user', JSON.stringify(userDto));
    }

    @Get('product')
    getProduct(): Observable<string> {
        return this.client.send<string>('findall-products', '');
    }

    @Post('product')
    createProduct(@Body() productDto: CreateProductDto): Observable<string> {
        return this.client.send<string>('create-product', JSON.stringify(productDto));
    }
}
