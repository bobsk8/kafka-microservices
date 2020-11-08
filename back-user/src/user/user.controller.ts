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
        const { username } = payload.value;
        this.logger.log('handleLogin', JSON.stringify(username));
        return this.userService.findByUsername(username)
        .catch(err => {
            this.logger.log('handleLogin error', err);
            return err;
        });
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.CREATE_USER)
    handleCreateUser(@Payload() payload: any): Promise<any> {
        const createUserDto = payload.value;
        this.logger.log('handleCreateUser', JSON.stringify(createUserDto));
        return this.userService.create(createUserDto)
        .catch(err => {
            this.logger.log('handleCreateUser error', err);
            return err;
        });
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.FIND_ALL_USERS)
    handleUserFindAll(): Promise<any[]> {
        this.logger.log('handleUserFindAll');
        return this.userService.findAll()
        .catch(err => {
            this.logger.log('handleUserFindAll error', err);
            return err;
        });
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.FIND_ONE_USER)
    handleUserFindOne(@Payload() payload: any): Promise<any> {
        const { id } = payload.value;
        this.logger.log('handleUserFindOne', JSON.stringify(id));
        return this.userService.findOne(id)
        .catch(err => {
            this.logger.log('handleUserFindOne error', err);
            return err;
        });
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.UPDATE_USER)
    handleUserUpdate(@Payload() payload: any): Promise<any> {
        const { id, updateUserDto } = payload.value;
        this.logger.log('handleUserUpdate', JSON.stringify({ id, updateUserDto }));
        return this.userService.update(id, updateUserDto)
        .catch(err => {
            this.logger.log('handleUserUpdate error', err);
            return err;
        });
    }

    @MessagePattern(CONSTANTS.USER_TOPICS.REMOVE_USER)
    handleUserRemove(@Payload() payload: any): Promise<any> {
        const { id } = payload.value;
        this.logger.log('handleUserRemove', JSON.stringify(id));
        return this.userService.remove(id)
        .catch(err => {
            this.logger.log('handleUserRemove error', err);
            return err;
        });
    }

}
