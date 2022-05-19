import { SEPMovie } from "../shared/interfaces/interfaces";

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

export enum SEP_FOLLOWS_TYPES {
  followers = `followers`,
  following = `following`,
}

export interface SEPUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  login: string,
  email: string,
  firstName: string,
  lastName: string,
  avatar: string
}

export interface SEPToplist {
  title: string;
  description: string
  numberOfMovies: number;
}

export interface SEPToplistDetails extends SEPToplist {
  movies: SEPMovie[];
}

export interface SEPComment {
   author: SEPUser;
   content: string;
}

export interface SEPRating {
  author: SEPUser;
  rating: number;
}
