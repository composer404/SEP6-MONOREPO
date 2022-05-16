import { ApiProperty } from "@nestjs/swagger";

// export interface SignUpInput {
//     @ApiProperty()
//     login: string;

//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     avatar: string;
// }

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
