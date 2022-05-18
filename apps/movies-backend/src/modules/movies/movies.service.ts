import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { SEPMovieInput } from '../../models';
import { PrismaService } from '../../prisma';

@Injectable()
export class MoviesService {
    private database: Prisma.MovieDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.movie;
    }

    async getMoviesForTopList(topListId: string): Promise<Movie[]> {
        return this.database
            .findMany({
                where: {
                    topLists: {
                        some: {
                            id: topListId,
                        },
                    },
                },
            })
            .catch(() => {
                return null;
            });
    }

    async selectMovieById(id: string): Promise<Movie | null> {
        const result = await this.database
            .findFirst({
                where: {
                    id,
                },
                include: {
                    comments: true,
                    ratings: true,
                },
            })
            .catch(() => {
                return null;
            });
        if (!result) {
            return null;
        }
        return result;
    }

    async getMovie(movie: SEPMovieInput): Promise<Movie> {
        const dbResult = await this.selectMovieByApiId(movie.apiId);

        if (dbResult) {
            return dbResult;
        }

        const createdId = await this.createMovie(movie);
        return this.selectMovieById(createdId);
    }

    async selectFullMovieByApiId(apiId: number): Promise<Movie | null> {
        const result = await this.database
            .findFirst({
                where: {
                    apiId,
                },
                include: {
                    comments: true,
                    ratings: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }
        return result;
    }

    async selectMovieByApiId(apiId: number): Promise<Movie | null> {
        const result = await this.database
            .findUnique({
                where: {
                    apiId: parseInt(apiId as any),
                },
            })
            .catch((error) => {
                console.log(`[API]`, error);
                return null;
            });

        if (!result) {
            return null;
        }
        return result;
    }

    async createMovie(movie: SEPMovieInput): Promise<string | null> {
        const movieResult = await this.database
            .create({
                data: {
                    ...movie,
                },
            })
            .catch((error) => {
                console.log(`[API]`, error);
                return null;
            });
        if (!movieResult) {
            return null;
        }
        return movieResult.id;
    }
}
