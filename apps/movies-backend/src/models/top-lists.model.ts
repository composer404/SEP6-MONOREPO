import { ApiProperty } from '@nestjs/swagger';

export class SEPTopListInput {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
}
