import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users';
import { User } from '@prisma/client';
import { SignUpInput } from 'src/interfaces/interfaces';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async validateUser(login: string, password: string): Promise<User> {
        console.log(`auth service validate user`);
        /* ----------------------------- USER VALIDATION ---------------------------- */

        const user = await this.userService.findUserByLogin(login);
        if (!user) {
            return null;
        }

        /* --------------------------- PASSWORD VALIDATION -------------------------- */

        const passwordValidation = await argon2.verify(user.password, password);
        if (!passwordValidation) {
            return null;
        }

        return { password, ...user };
    }

    async login(user: any) {
        console.log(`auth service login`, user);
        /* -------------------------- GENERATING JWT TOKEN -------------------------- */

        const payload = {
            login: user.login,
            sub: user.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async registry(userInput: SignUpInput) {
        await this.userService.createUser(userInput);
        return true;
    }
}
