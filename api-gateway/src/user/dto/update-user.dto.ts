import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    
    @ApiProperty({
        description: 'The name of user',
    })
    @IsString()
    name: string;  
}