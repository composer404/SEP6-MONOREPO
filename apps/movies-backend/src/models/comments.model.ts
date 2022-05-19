import { ApiProperty } from '@nestjs/swagger';
import { SEPMovieInput } from './movies.model';

export class SEPCommentInput {
    @ApiProperty()
    content: string;

    @ApiProperty()
    movie: SEPMovieInput;
}

export class SEPCommentEditInput {
    @ApiProperty()
    commentId: string;

    @ApiProperty()
    content: string;
}
