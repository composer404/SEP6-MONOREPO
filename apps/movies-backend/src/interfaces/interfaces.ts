export interface User {
    login: string;
    email: string;
}

export interface SignUpInput {
    login: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export interface SignInInput {
    login: string;
    password: string;
}
