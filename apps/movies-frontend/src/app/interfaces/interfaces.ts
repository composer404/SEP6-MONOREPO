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

export enum API_ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}

export enum SEP_ERROR_CODES {
    unauthorized = `unauthorized`,
    internal = `internal`,
}

export enum SEP_PROFILE_SECTIONS {
    toplists = `toplists`,
    comments = `comments`,
    ratings = `ratings`,
    statistics = `statistics`,
}

export enum SEP_USER_ACTIONS {
    confirm = `confirm`,
    cancel = `cancel`,
}

export interface SEPApiCreatedObject {
    id: string;
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

export interface SEPComment {
    id?: string;
    authorId?: string;
    movie?: SEPMovie;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    author?: SEPUser;
}

export interface SEPRating {
    id?: string;
    authorId: string;
    movie: SEPMovie;
    rating: number;
    createdAt: string;
    updateAt: string;
    author: SEPUser;
}

export interface SEPToplist {
    id: string;
    name: string;
    description: string;
    numberOfMovies: number;
    movieApiIds: number[];
    movieLocalIds: string[];
    createdAt: string;
    updateAt: string;
}

export interface SEPToplistDetails extends SEPToplist {
    movies: SEPMovie[];
}

export interface SEPRating {
    author: SEPUser;
    rating: number;
}

export interface TopListInput {
    name: string;
    description: string;
}
