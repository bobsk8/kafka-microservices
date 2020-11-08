import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete, UseGuards, OnModuleInit } from '@nestjs/common';
import { microserviceConfig } from 'src/microserviceConfig';
import { Client, ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CONSTANTS } from 'common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('user')
@ApiBearerAuth()
@Controller('api/user')
export class UserController implements OnModuleInit {

    @Client(microserviceConfig)
    client: ClientKafka;

    constructor() { }

    onModuleInit() {
        const requestPatterns = [
            CONSTANTS.USER_TOPICS.CREATE_USER,
            CONSTANTS.USER_TOPICS.FIND_ALL_USERS,
            CONSTANTS.USER_TOPICS.FIND_ONE_USER,
            CONSTANTS.USER_TOPICS.UPDATE_USER,
            CONSTANTS.USER_TOPICS.REMOVE_USER,
        ];
        requestPatterns.forEach(pattern => {
            this.client.subscribeToResponseOf(pattern);
        });
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    create(@Body() createUserDto: CreateUserDto) {
        return this.client.send<string>('create-user', JSON.stringify(createUserDto));
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.client.send<string>('findall-users', '');
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id) {
        return this.client.send<string>('findone-user', JSON.stringify({ id }));
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.client.send<string>('update-user', JSON.stringify({ id, updateUserDto }));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id) {
        return this.client.send<string>('remove-user', JSON.stringify({ id }));
    }
}
