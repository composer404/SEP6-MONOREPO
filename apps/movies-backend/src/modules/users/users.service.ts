import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { Follows, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { SignUpInput, UserUpdateInput } from '../../models';
import { CommentsService } from '../comments';
import { RatingsService } from '../ratings';

@Injectable()
export class UsersService {
    private database: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    private followsDb: Prisma.FollowsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly commentsService: CommentsService,
        private readonly ratingService: RatingsService,
    ) {
        this.database = this.prismaService.user;
        this.followsDb = this.prismaService.follows;
    }

    /* ----------------------------- SELECT USER ----------------------------- */

    async findUserByLogin(login: string): Promise<User> {
        return this.database.findFirst({
            where: {
                login,
            },
        });
    }

    async findUserById(id: string): Promise<User | null> {
        const prismaUser = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!prismaUser) {
            return null;
        }

        delete prismaUser.password;
        return prismaUser;
    }
    async findUserByEmail(email: string): Promise<User | null> {
        const prismaUser = await this.database
            .findFirst({
                where: {
                    email,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!prismaUser) {
            return null;
        }
        delete prismaUser.password;
        return prismaUser;
    }

    /* ----------------------------- CREATE USER ----------------------------- */

    async createUser(input: SignUpInput): Promise<string | null> {
        const prismaUser = await this.database
            .create({
                data: {
                    ...input,
                    password: await argon2.hash(input.password),
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!prismaUser) {
            return null;
        }

        return prismaUser.id;
    }

    /* ------------------------------- UPDATE USER ------------------------------ */

    async updateUser(userId: string, input: UserUpdateInput): Promise<boolean> {
        const result = await this.database
            .update({
                where: {
                    id: userId,
                },
                data: {
                    ...input,
                    password: await argon2.hash(input.password),
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    /* ------------------------------- DELETE USER ------------------------------ */

    async deleteUser(userId: string): Promise<boolean> {
        await this.commentsService.removeAllCommentsForUser(userId);
        await this.ratingService.removeAllRatingsForUser(userId);
        await this.removeUserFromFollowers(userId);

        const result = await this.database
            .delete({
                where: {
                    id: userId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });
        if (!result) {
            return false;
        }
        return true;
    }

    async followUser(userId: string, followingId: string): Promise<boolean> {
        const result = await this.followsDb
            .create({
                data: {
                    followerId: userId,
                    followingId: followingId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });
        if (!result) {
            return false;
        }
        return true;
    }

    async removeUserFromFollowers(userId: string): Promise<boolean> {
        const result = await this.followsDb
            .deleteMany({
                where: {
                    followerId: userId,
                    OR: {
                        followingId: userId,
                    },
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });
        if (!result) {
            return false;
        }
        return true;
    }

    async unFollowUser(userId: string, followingId: string): Promise<boolean> {
        const result = await this.followsDb
            .deleteMany({
                where: {
                    followerId: userId,
                    followingId: followingId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });
        if (!result) {
            return false;
        }
        return true;
    }

    async getFollowersForUser(userId: string): Promise<User[] | null> {
        const result = await this.followsDb
            .findMany({
                where: {
                    followingId: userId,
                },
                include: {
                    follower: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }

        const promises = result.map((follows) => {
            return new Promise<User>((resolve) => {
                delete follows.follower.password;
                resolve(follows.follower);
            });
        });

        const users = await Promise.all(promises);
        return users;
    }

    async checkIfFollowing(userId: string, followingId: string): Promise<boolean> {
        const result = await this.followsDb.findFirst({
            where: {
                followerId: userId,
                followingId,
            },
        });

        if (!result) {
            return false;
        }
        return true;
    }

    async getFollowersNumberForUser(userId: string): Promise<number | null> {
        const result = await this.getFollowersForUser(userId);
        if (!result) {
            return null;
        }
        return result.length;
    }

    async getFollowingForUser(userId: string): Promise<User[] | null> {
        const result = await this.followsDb
            .findMany({
                where: {
                    followerId: userId,
                },
                include: {
                    following: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }
        const promises = result.map((follows) => {
            return new Promise<User>((resolve) => {
                delete follows.following.password;
                resolve(follows.following);
            });
        });

        const users = await Promise.all(promises);
        return users;
    }

    async getFollowingNumberForUser(userId: string): Promise<number | null> {
        const result = await this.getFollowingForUser(userId);
        if (!result) {
            return null;
        }
        return result.length;
    }
}
