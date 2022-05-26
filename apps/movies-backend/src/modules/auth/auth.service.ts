import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users';
import { CreatedObjectResponse, SignUpInput } from '../../models';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

    async validateUser(login: string, password: string): Promise<User | null> {
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

    async login(user: any): Promise<any> {
        /* -------------------------- GENERATING JWT TOKEN -------------------------- */
        if (!user) {
            return null;
        }

        const payload = {
            login: user.login,
            sub: user.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async registry(userInput: SignUpInput): Promise<CreatedObjectResponse | null> {
        return this.userService.createUser(userInput);
    }
}
