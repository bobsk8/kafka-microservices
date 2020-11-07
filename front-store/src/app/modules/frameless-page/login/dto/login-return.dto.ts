import { User } from 'src/app/model/user.model';

export class LoginReturnDto {
    constructor(
        public user: User,
        public token: string
    ) { }
}
