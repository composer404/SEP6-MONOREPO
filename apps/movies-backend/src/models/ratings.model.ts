import { ApiProperty } from '@nestjs/swagger';
import { SEPMovieInput } from './movies.model';

export class SEPRatingInput {
    @ApiProperty()
    rating: number;

    @ApiProperty()
    movie: SEPMovieInput;
}
