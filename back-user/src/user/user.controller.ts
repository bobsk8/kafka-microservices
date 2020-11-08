import { Controller, Logger } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CONSTANTS } from 'common';

import { UserService } from 'src/user/user.service';
import { microserviceConfig } from 'src/microserviceConfig';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }

    @Client(microserviceConfig)
    client: ClientKafka;

    @MessagePattern(CONSTANTS.USER_TOPICS.LOGIN_USER)
    handleLogin(@Payload() payload: any): Promise<any> {
        const { username } = JSON.parse(payload.value);
        this.logger.log('handleLogin', JSON.stringify(payload));
        return this.userService.findByUsername(username);
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.CREATE_USER)
    handleCreateUser(@Payload() payload: any): Promise<any> {
        const { createUserDto } = JSON.parse(payload.value);
        this.logger.log('handleCreateUser', JSON.stringify(payload));
        return this.userService.create(createUserDto);
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.FIND_ALL_USERS)
    handleUserFindAll(): Promise<any[]> {
        this.logger.log('handleUserFindAll');
        return this.userService.findAll();
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.FIND_ONE_USER)
    handleUserFindOne(@Payload() payload: any): Promise<any> {
        const { id } = JSON.parse(payload.value);
        this.logger.log('handleUserFindOne', JSON.stringify(payload));
        return this.userService.findOne(id);
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.UPDATE_USER)
    handleUserUpdate(@Payload() payload: any): Promise<any> {
        const { id, updateUserDto } = JSON.parse(payload.value);
        this.logger.log('handleUserUpdate', JSON.stringify(payload));
        return this.userService.update(id, updateUserDto);
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.REMOVE_USER)
    handleUserRemove(@Payload() payload: any): Promise<any> {
        const { id } = JSON.parse(payload.value);
        this.logger.log('handleUserRemove', JSON.stringify(payload));
        return this.userService.remove(id);
    }

}
