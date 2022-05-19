import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SEPRatingInput } from '../../models/ratings.model';
import { PrismaService } from '../../prisma';
import { MoviesService } from '../movies';

@Injectable()
export class RatingsService {
    private database: Prisma.RatingDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService, private readonly movieSerivce: MoviesService) {
        this.database = this.prismaService.rating;
    }

    async addRatingToMovie(userId: string, input: SEPRatingInput): Promise<string | null> {
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
        return result.id;
    }

    async removeAllRatingsForUser(userId: string) {
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