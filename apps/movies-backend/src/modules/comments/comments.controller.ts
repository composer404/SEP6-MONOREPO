import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreatedObjectResponse, SEPCommentEditInput, SEPCommentInput, SEPRequest } from '../../models';
import { JwtAuthGuard } from '../auth/guards';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsSerivce: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCommentToMovie(
        @Request() req: SEPRequest,
        @Body() input: SEPCommentInput,
    ): Promise<CreatedObjectResponse | null> {
        return this.commentsSerivce.addCommentToMovie(req.user.id, input);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async editComment(@Request() req: SEPRequest, @Body() input: SEPCommentEditInput): Promise<boolean> {
        return this.commentsSerivce.editComment(req.user.id, input);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(`:id`)
    async removeCommentFromMovie(@Request() req: SEPRequest, @Param() params: any): Promise<boolean> {
        return this.commentsSerivce.removeCommentFromMovie(req.user.id, params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`:id`)
    async getCommentsForUser(@Param() params: any): Promise<Comment[] | null> {
        return this.commentsSerivce.getCommentsForUser(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`full/:id`)
    async getCommentsById(@Param() params: any): Promise<Comment | null> {
        return this.commentsSerivce.getCommentById(params.id);
    }
}
