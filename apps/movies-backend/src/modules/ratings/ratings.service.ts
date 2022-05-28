import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { CreatedObjectResponse } from '../../models';
import { SEPRatingInput } from '../../models/ratings.model';
import { PrismaService } from '../../prisma';
import { MoviesService } from '../movies';

@Injectable()
export class RatingsService {
    private database: Prisma.RatingDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService, private readonly movieSerivce: MoviesService) {
        this.database = this.prismaService.rating;
    }

    async addRatingToMovie(userId: string, input: SEPRatingInput): Promise<CreatedObjectResponse | null> {
        const foundMovie = await this.movieSerivce.getMovie(input.movie);

        const result = await this.database
            .create({
                data: {
                    movieId: foundMovie.id,
                    authorId: userId,
                    rating: input.rating,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!result) {
            return null;
        }
        return {
            id: result.id,
        };
    }

    async getRatingsForUser(id: string): Promise<Rating[] | null> {
        const result = await this.database
            .findMany({
                where: {
                    authorId: id,
                },
                include: {
                    movie: true,
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

    async getRatingsById(id: string): Promise<Rating | null> {
        const result = await this.database
            .findFirst({
                where: {
                    id,
                },
                include: {
                    author: true,
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

    async removeAllRatingsForUser(userId: string): Promise<boolean> {
        const result = await this.database
            .deleteMany({
                where: {
                    authorId: userId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
        if (!result) {
            return false;
        }
        return true;
    }
}
