import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SEPRequest } from '../../models';
import { SEPRatingInput } from '../../models/ratings.model';
import { JwtAuthGuard } from '../auth/guards';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsSerivce: RatingsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCommentToMovie(@Request() req: SEPRequest, input: SEPRatingInput): Promise<string | null> {
        return this.ratingsSerivce.addRatingToMovie(req.user.id, input);
    }
}
