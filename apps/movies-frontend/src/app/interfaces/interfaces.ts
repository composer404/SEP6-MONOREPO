import { SEPMovie } from '../shared/interfaces/interfaces';

export interface Token {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    login: string;
}

export interface SignUpInput {
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar: string;
}

export enum SEP_FOLLOWS_TYPES {
    followers = `followers`,
    following = `following`,
}

export enum SEP_PROFILE_SECTIONS {
    toplists = `toplists`,
    comments = `comments`,
    ratings = `ratings`,
    statistics = `statistics`,
}

export interface SEPUser {
    id: string;
    createdAt: string;
    updatedAt: string;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export interface SEPDatabaseObject<T> {
    (arg: T): T;
    createdAt: string;
    updatedAt: string;
}

export interface SEPComment {
    authorId: string;
    movie: SEPMovie;
    content: string;
    createdAt: string;
    updateAt: string;
}

export interface SEPRating {
    authorId: string;
    movie: SEPMovie;
    rating: number;
    createdAt: string;
    updateAt: string;
}

export interface SEPToplist {
    name: string;
    description: string;
    numberOfMovies: number;
}

export interface SEPToplistDetails extends SEPToplist {
    movies: SEPMovie[];
}

export interface SEPRating {
    author: SEPUser;
    rating: number;
}
