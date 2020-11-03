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

    @MessagePattern('findall-users')
    handleUserFindAll(@Payload() payload: any): Promise<any[]> {
        this.logger.log('handleUserFindAll', JSON.stringify(payload));
        return this.userService.findAll();
    }

    @MessagePattern('create-user')
    async handleUserCreate(@Payload() payload: any): Promise<any> {
        this.logger.log('handleUserCreate', JSON.stringify(payload));
        return await this.userService.create(payload.value);
    }
}
