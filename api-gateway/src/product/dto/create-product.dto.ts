import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({
        description: 'The name of product',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Price of product',
    })
    @IsString()
    price: number;
}
