import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users';
import { SignUpInput } from '../../models';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

    async validateUser(login: string, password: string): Promise<User> {
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
