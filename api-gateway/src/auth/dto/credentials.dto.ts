import { IsString } from 'class-validator';

export class CredentialsDto {

    @IsString()
    username: string;

    @IsString()
    password: string;
}
