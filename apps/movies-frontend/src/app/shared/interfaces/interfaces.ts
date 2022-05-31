import { NumberValueAccessor } from '@angular/forms';
import { SEPComment, SEPRating } from '../../interfaces/interfaces';

export interface SEPMovie {
    id: number;
    apiId: number;
    title: string;
    posterPath: string;
    updatedAt: string;
    comments: SEPComment[];
    ratings: SEPRating[];
    createdAt: string;
}

export interface SEPMovieShort {
    apiId: number;
    title: string;
    posterPath: string;
}

export interface SEPList<T> {
    page: number;
    results: T[];
    total_results: number;
    total_pages: number;
}

export interface SEPQueryParam {
    name: string;
    value: string;
}

export interface SEPMovieDetails {
    adult: false;
    backdrop_path: string | undefined;
    belongs_to_collection: SEPColection[];
    budget: number;
    genres: SEPGenre[];
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | undefined;
    production_companies: SEPCompanies[];
    production_countries: SEPCountries;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SEPLanguages[];
    status: string;
    tagline: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}

export interface SEPGenre {
    id: number;
    name: string;
}

export interface SEPColection {
    backdrop_path: string | undefined;
    id: number;
    name: string;
    poster_path: string | undefined;
}

export interface SEPCompanies {
    id: number;
    logo_path: string | undefined;
    name: string;
    origin_country: string;
}

export interface SEPCountries {
    iso_3166_1: string;
    name: string;
}

export interface SEPLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface SEPActorsDetails {
    adult: boolean;
    also_known_as: {
        name: string;
    };
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface SEPActors {
    adult: false;
    gender: number;
    id: number;
    known_for: SEPKnownFor[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export interface SEPKnownFor {
    adult: false;
    backdrop_path: string | undefined;
    first_air_date: string;
    genre_ids: number;
    id: number;
    media_type: string;
    name: string;
    origin_country: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string | undefined;
    vote_average: number;
    vote_count: number;
}

export interface SEPCredits {
    credit_type: string;
    department: string;
    job: string;
    media: SEPMedia[];
    seasons: SEPSeason[];
    media_type: string;
    id: number;
    person: SEPPerson[];
}

export interface SEPPerson {
    name: string;
    id: number;
}

export interface SEPSeason {
    air_date: string;
    poster_path: string;
    season_number: number;
}

export interface SEPMedia {
    id: number;
    name: string;
    original_name: string;
    character: string;
    episodes: number;
}

export interface SEPCastList {
    cast: SEPCast[];
    crew: SEPCrew[];
    id: number;
}

export interface SEPCast {
    adult: false;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | undefined;
}

export interface SEPCrew {
    adult: false;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}
