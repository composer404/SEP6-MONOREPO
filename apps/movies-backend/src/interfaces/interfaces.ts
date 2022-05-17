import { ApiProperty } from '@nestjs/swagger';

/* ------------------------------- INTERFACES ------------------------------- */

export interface SEPRequest {
    user: UserOutput;
}
export interface UserOutput {
    id: string;
    login: string;
}

export interface SEPUser {
    id: string;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

/* --------------------------------- CLASSES -------------------------------- */

export class SignInInput {
    @ApiProperty()
    login: string;
    @ApiProperty()
    password: string;
}

export class SignUpInput {
    @ApiProperty()
    login: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    avatar: string;
}

export class UserUpdateInput {
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    avatar: string;
}

export class SEPMovieInput {
    @ApiProperty()
    apiId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    posterPath: string;
}

export class SEPTopListInput {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
}
