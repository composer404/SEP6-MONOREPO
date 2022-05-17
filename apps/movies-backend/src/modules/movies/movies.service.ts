import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { SEPMovieInput } from '../../interfaces/interfaces';
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

    async selectMovieById(id: string): Promise<Movie> {
        return this.database
            .findFirst({
                where: {
                    id,
                },
                include: {
                    commands: true,
                    ratings: true,
                },
            })
            .catch(() => {
                return null;
            });
    }

    async getMovie(movie: SEPMovieInput): Promise<Movie> {
        const dbResult = await this.selectMovieByApiId(movie.apiId);

        if (dbResult) {
            return dbResult;
        }

        const createdId = await this.createMovie(movie);
        return this.selectMovieById(createdId);
    }

    async selectFullMovieByApiId(apiId: number): Promise<Movie> {
        return this.database
            .findFirst({
                where: {
                    apiId,
                },
                include: {
                    commands: true,
                    ratings: true,
                },
            })
            .catch(() => {
                return null;
            });
    }

    async selectMovieByApiId(apiId: number): Promise<Movie> {
        return this.database
            .findUnique({
                where: {
                    apiId: parseInt(apiId as any),
                },
            })
            .catch((error) => {
                console.log(`[API]`, error);
                return null;
            });
    }

    async createMovie(movie: SEPMovieInput): Promise<string> {
        const movieResult = await this.database.create({
            data: {
                ...movie,
            },
        });
        return movieResult.id;
    }
}
