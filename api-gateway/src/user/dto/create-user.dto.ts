import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'The firstName of user',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The lastName of user',
    })
    @IsString()
    lastName: string;

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
