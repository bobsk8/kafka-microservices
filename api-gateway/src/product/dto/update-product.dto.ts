import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {

    @ApiProperty({
        description: 'The name of user',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Price of product',
    })
    @IsString()
    price: number;
}