import { Controller, Delete, Post, Put, Request, UseGuards } from '@nestjs/common';
import { SEPCommentEditInput, SEPCommentInput, SEPRequest } from '../../models';
import { JwtAuthGuard } from '../auth/guards';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsSerivce: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCommentToMovie(@Request() req: SEPRequest, input: SEPCommentInput): Promise<string | null> {
        return this.commentsSerivce.addCommentToMovie(req.user.id, input);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async editComment(@Request() req: SEPRequest, input: SEPCommentEditInput): Promise<boolean> {
        return this.commentsSerivce.editComment(req.user.id, input);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async removeCommentFromMovie(@Request() req: SEPRequest, commentId: string): Promise<boolean> {
        return this.commentsSerivce.removeCommentFromMovie(req.user.id, commentId);
    }
}
