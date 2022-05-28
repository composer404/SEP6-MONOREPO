import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) {}

    @Get(`:apiId`)
    async getFullMovie(@Param() params: any) {
        return this.movieService.selectFullMovieByApiId(params.apiId);
    }
}
