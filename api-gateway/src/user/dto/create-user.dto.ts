import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'The name of user',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The username of user',
    })
    @IsString()
    username: string

    @ApiProperty({
        description: 'The password of user',
    })
    @IsString()
    password: string
}
