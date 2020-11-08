import { Controller, Logger } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from 'src/user/user.service';
import { microserviceConfig } from 'src/microserviceConfig';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }

    @Client(microserviceConfig)
    client: ClientKafka;

    @MessagePattern('login-user')
    handleLogin(@Payload() payload: any): Promise<any> {
        const { username } = JSON.stringify(payload)['value'];
        this.logger.log('handleLogin', JSON.stringify(payload));
        return this.userService.findByUsername(username);
    }

    @MessagePattern('create-user')
    handleCreateUser(@Payload() payload: any): Promise<any> {
        const { createUserDto } = JSON.stringify(payload)['value'];
        this.logger.log('handleCreateUser', JSON.stringify(payload));
        return this.userService.create(createUserDto);
    }

    @MessagePattern('findall-users')
    handleUserFindAll(): Promise<any[]> {
        this.logger.log('handleUserFindAll');
        return this.userService.findAll();
    }

    @MessagePattern('findone-user')
    handleUserFindOne(@Payload() payload: any): Promise<any> {
        const { id } = JSON.stringify(payload)['value'];
        this.logger.log('handleUserFindOne', JSON.stringify(payload));
        return this.userService.findOne(id);
    }

    @MessagePattern('update-user')
    handleUserUpdate(@Payload() payload: any): Promise<any> {
        const { id, updateUserDto } = JSON.stringify(payload)['value'];
        this.logger.log('handleUserUpdate', JSON.stringify(payload));
        return this.userService.update(id, updateUserDto);
    }

    @MessagePattern('remove-user')
    handleUserRemove(@Payload() payload: any): Promise<any> {
        const { id } = JSON.stringify(payload)['value'];
        this.logger.log('handleUserRemove', JSON.stringify(payload));
        return this.userService.remove(id);
    }

}
