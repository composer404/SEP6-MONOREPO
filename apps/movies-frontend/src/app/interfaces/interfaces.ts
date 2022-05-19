export interface Token {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    login: string;
}

export interface SignUpInput {
  login: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  avatar: string
}
