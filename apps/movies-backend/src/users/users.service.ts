import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { SignUpInput } from 'src/interfaces/interfaces';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UsersService {
    private database: Prisma.UserDelegate<
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.user;
    }

    /* ----------------------------- SELECT ACTIONS ----------------------------- */

    async findUserByLogin(login: string): Promise<User> {
        return this.database.findFirst({
            where: {
                login,
            },
        });
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.database.findFirst({
            where: {
                email,
            },
        });
    }

    /* ----------------------------- CREATE ACTIONS ----------------------------- */

    async createUser(input: SignUpInput): Promise<User> {
        return this.database.create({
            data: {
                ...input,
                password: await argon2.hash(input.password),
            },
        });
    }
}
