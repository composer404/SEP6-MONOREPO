import { ApiProperty } from '@nestjs/swagger';

/* ------------------------------- INTERFACES ------------------------------- */

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

export interface UserOutput {
    id: string;
    login: string;
}

export interface SEPRequest {
    user: UserOutput;
}

/* --------------------------------- CLASSES -------------------------------- */

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
