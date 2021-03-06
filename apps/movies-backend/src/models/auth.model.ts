import { ApiProperty } from '@nestjs/swagger';

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

export class CreatedObjectResponse {
    @ApiProperty()
    id: string;
}

export enum ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}

export class PrismaErrorResponse {
    @ApiProperty()
    code: ERROR_CODES;
}
