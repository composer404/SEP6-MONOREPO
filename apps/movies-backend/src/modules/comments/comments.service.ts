import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatedObjectResponse, SEPCommentEditInput, SEPCommentInput } from '../../models';
import { PrismaService } from '../../prisma';
import { MoviesService } from '../movies';

@Injectable()
export class CommentsService {
    private database: Prisma.CommentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService, private readonly movieSerivce: MoviesService) {
        this.database = this.prismaService.comment;
    }

    async addCommentToMovie(userId: string, input: SEPCommentInput): Promise<CreatedObjectResponse | null> {
        const foundMovie = await this.movieSerivce.getMovie(input.movie);

        const result = await this.database
            .create({
                data: {
                    movieId: foundMovie.id,
                    authorId: userId,
                    content: input.content,
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

    async editComment(userId: string, input: SEPCommentEditInput): Promise<boolean> {
        const result = await this.database
            .updateMany({
                where: {
                    authorId: userId,
                    id: input.commentId,
                },
                data: {
                    content: input.content,
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

    async removeCommentFromMovie(userId: string, commentId: string): Promise<boolean> {
        const result = await this.database
            .deleteMany({
                where: {
                    id: commentId,
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

    async getCommentsForUser(id: string): Promise<Comment[] | null> {
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

    async getCommentById(id: string): Promise<Comment | null> {
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

    async removeAllCommentsForUser(userId: string) {
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
