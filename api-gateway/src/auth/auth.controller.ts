import { Controller, Post, Body, ValidationPipe, UsePipes, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientKafka } from '@nestjs/microservices';

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
            'login-user'
        ];
        requestPatterns.forEach(pattern => {
            this.client.subscribeToResponseOf(pattern);
        });
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() credentialsDto: CredentialsDto) {

        const { username, password } = credentialsDto;

        this.client.send<string>('login-user', JSON.stringify(username))
            .subscribe((user: any) => {
                if (user && user.password === passwordHash(password)) {
                    const payload = { username: user.username, sub: user.id };
                    return {
                        user,
                        token: this.jwtService.sign(payload)
                    };
                }
                if (!user) {
                    throw new UnauthorizedException(`username or password is incorrect`);
                }
            });
    }
}
