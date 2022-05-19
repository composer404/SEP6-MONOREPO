import { ApiProperty } from '@nestjs/swagger';

export class SEPMovieInput {
    @ApiProperty()
    apiId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    posterPath: string;
}
