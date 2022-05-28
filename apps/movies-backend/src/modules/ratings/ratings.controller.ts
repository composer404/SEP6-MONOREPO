import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Rating } from '@prisma/client';
import { CreatedObjectResponse, SEPRequest } from '../../models';
import { SEPRatingInput } from '../../models/ratings.model';
import { JwtAuthGuard } from '../auth/guards';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsSerivce: RatingsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCommentToMovie(
        @Request() req: SEPRequest,
        @Body() input: SEPRatingInput,
    ): Promise<CreatedObjectResponse | null> {
        return this.ratingsSerivce.addRatingToMovie(req.user.id, input);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRatingsForUser(@Param() params: any): Promise<Rating[] | null> {
        return this.ratingsSerivce.getRatingsForUser(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`full/:id`)
    async getCommentsById(@Param() params: any): Promise<Rating | null> {
        return this.ratingsSerivce.getRatingsById(params.id);
    }
}
