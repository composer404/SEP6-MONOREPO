import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {
    SignUpInput,
    SEPUser,
    UserUpdateInput,
} from 'src/interfaces/interfaces';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UsersService {
    private database: Prisma.UserDelegate<
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.user;
    }

    /* ----------------------------- SELECT USER ----------------------------- */

    async findUserByLogin(login: string): Promise<User> {
        return this.database.findFirst({
            where: {
                login,
            },
        });
    }

    async findUserById(id: string): Promise<SEPUser> {
        const prismaUser = await this.database.findFirst({
            where: {
                id,
            },
        });
        return this.createOutputUser(prismaUser);
    }
    async findUserByEmail(email: string): Promise<SEPUser> {
        const prismaUser = await this.database.findFirst({
            where: {
                email,
            },
        });
        return this.createOutputUser(prismaUser);
    }

    /* ----------------------------- CREATE USER ----------------------------- */

    async createUser(input: SignUpInput): Promise<SEPUser> {
        const prismaUser = await this.database.create({
            data: {
                ...input,
                password: await argon2.hash(input.password),
            },
        });
        return this.createOutputUser(prismaUser);
    }

    /* ------------------------------- UPDATE USER ------------------------------ */

    async updateUser(userId: string, input: UserUpdateInput): Promise<boolean> {
        await this.database
            .update({
                where: {
                    id: userId,
                },
                data: {
                    ...input,
                    password: await argon2.hash(input.password),
                },
            })
            .catch(() => {
                return false;
            });
        return true;
    }

    /* ------------------------------- DELETE USER ------------------------------ */

    async deleteUser(userId: string): Promise<boolean> {
        await this.database
            .delete({
                where: {
                    id: userId,
                },
            })
            .catch(() => {
                return false;
            });
        return true;
    }

    private createOutputUser(prismaUser: User): SEPUser {
        return {
            id: prismaUser.id,
            firstName: prismaUser.firstName,
            login: prismaUser.login,
            email: prismaUser.email,
            lastName: prismaUser.lastName,
            avatar: prismaUser.avatar,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        };
    }
}
