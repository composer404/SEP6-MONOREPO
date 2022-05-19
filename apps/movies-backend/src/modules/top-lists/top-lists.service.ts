import { Injectable } from '@nestjs/common';
import { Prisma, TopList } from '@prisma/client';
import { SEPMovieInput, SEPTopListInput } from '../../interfaces/interfaces';
import { PrismaService } from '../../prisma';
import { MoviesService } from '../movies';

@Injectable()
export class TopListsService {
    private database: Prisma.TopListDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService, private readonly moviesService: MoviesService) {
        this.database = this.prismaService.topList;
    }

    async getTopListsByUserId(userId: string): Promise<TopList[]> {
        console.log(`HERE`, userId);
        return this.database
            .findMany({
                where: {
                    userId,
                },
            })
            .catch(() => {
                return null;
            });
    }

    async getTopListById(id: string): Promise<TopList> {
        return this.database
            .findFirst({
                where: {
                    id,
                },
                include: {
                    movies: true,
                },
            })
            .catch(() => {
                return null;
            });
    }

    async createNewTopList(userId: string, topListInput: SEPTopListInput): Promise<string> {
        const created = await this.database
            .create({
                data: {
                    ...topListInput,
                    userId,
                },
            })
            .catch(() => {
                return null;
            });
        return created?.id;
    }

    async deleteTopList(id: string, userId: string) {
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
