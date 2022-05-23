import { Injectable } from '@nestjs/common';
import { Prisma, TopList } from '@prisma/client';
import { resolve } from 'path';
import { CreatedObjectResponse, SEPMovieInput, SEPTopListInput } from '../../models';
import { PrismaService } from '../../prisma';
import { MoviesService } from '../movies';

@Injectable()
export class TopListsService {
    private database: Prisma.TopListDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService, private readonly moviesService: MoviesService) {
        this.database = this.prismaService.topList;
    }

    async getTopListsByUserId(userId: string): Promise<TopList[] | null> {
        const result = await this.database
            .findMany({
                where: {
                    userId,
                },
                include: {
                    movies: true,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }

        const promises = result.map((toplist) => {
            return new Promise<void>((resolve) => {
                toplist.numberOfMovies = toplist.movies.length;
                delete toplist.movies;
                resolve();
            });
        });
        await Promise.all(promises);
        return result;
    }

    async getTopListsFullByUserId(userId: string): Promise<TopList[] | null> {
        const result = await this.database
            .findMany({
                where: {
                    userId,
                },
                include: {
                    movies: true,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }
        return result;
    }

    async getTopListFullById(id: string): Promise<TopList | null> {
        const result = await this.database
            .findFirst({
                where: {
                    id,
                },
                include: {
                    movies: true,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });

        if (!result) {
            return null;
        }
        return result;
    }

    async getTopListById(id: string): Promise<TopList | null> {
        const result = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });

        if (!result) {
            return null;
        }
        return result;
    }

    async createNewTopList(userId: string, topListInput: SEPTopListInput): Promise<CreatedObjectResponse | null> {
        const created = await this.database
            .create({
                data: {
                    ...topListInput,
                    userId,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });

        if (!created) {
            return null;
        }
        return {
            id: created.id,
        };
    }

    async deleteTopList(id: string, userId: string): Promise<boolean> {
        const result = await this.database
            .deleteMany({
                where: {
                    id,
                    userId,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    async deleteAllTopListsForUser(userId: string): Promise<boolean> {
        const result = await this.database
            .deleteMany({
                where: {
                    userId,
                },
            })
            .catch((err) => {
                console.error(`[API]`, err);
                return null;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    async addMovieToTopList(id: string, movie: SEPMovieInput): Promise<boolean> {
        const foundMovie = await this.moviesService.getMovie(movie);
        const updated = await this.database
            .update({
                where: {
                    id,
                },
                data: {
                    movies: {
                        connect: {
                            apiId: foundMovie.apiId,
                        },
                    },
                },
            })
            .catch((error) => {
                console.log(`[API]`, error);
                return false;
            });

        if (updated) {
            return true;
        }
        return false;
    }

    async removeMovieFromTopList(id: string, movieApi: number): Promise<boolean> {
        const updated = await this.database
            .update({
                where: {
                    id,
                },
                data: {
                    movies: {
                        disconnect: {
                            apiId: parseInt(movieApi as any),
                        },
                    },
                },
            })
            .catch((error) => {
                console.log(`[API]`, error);
                return false;
            });

        if (updated) {
            return true;
        }
        return false;
    }
}
