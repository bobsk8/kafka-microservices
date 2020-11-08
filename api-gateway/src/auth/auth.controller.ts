import { Controller, Post, Body, ValidationPipe, UsePipes, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common';

import { microserviceConfig } from 'src/microserviceConfig';
import { CredentialsDto } from './dto/credentials.dto';
import { passwordHash } from './helpers';

@Controller('api/auth')
export class AuthController implements OnModuleInit {

    @Client(microserviceConfig)
    client: ClientKafka;

    constructor(
        private jwtService: JwtService
    ) { }

    onModuleInit() {
        const requestPatterns = [
            CONSTANTS.USER_TOPICS.LOGIN_USER
        ];
        requestPatterns.forEach(pattern => {
            this.client.subscribeToResponseOf(pattern);
        });
    }

    @Post()
    @UsePipes(ValidationPipe)
    async login(@Body() credentialsDto: CredentialsDto) {
        const { username, password } = credentialsDto;
        try {
            const user: any = await this.client.send<string>(CONSTANTS.USER_TOPICS.LOGIN_USER, JSON.stringify(username)).toPromise();
            if (user && user.password === passwordHash(password)) {
                const payload = { username: user.username, sub: user.id };
                return {
                    user,
                    token: this.jwtService.sign(payload)
                };
            } else {
                throw new Error;

            }
        } catch (err) {
            throw new UnauthorizedException(`username or password is incorrect`);
        }
    }
}
