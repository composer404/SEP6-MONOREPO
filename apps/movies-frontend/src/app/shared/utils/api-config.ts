import { environment } from 'src/environments/environment';

const API_URL = `https://api.themoviedb.org`;
const IMAGE_API_URL = `https://image.tmdb.org/t/p`;

export enum API_RESOURCES {
    POPULAR = `/3/movie/popular`,
    SEARCH = `/3/search/movie`,
    DETAILS = `/3/movie`,
}

export enum API_IMAGE_SIZE {
    ORIGINAL = `original`,
    W_500 = `w500`,
}

export const buildUrl = (resource: API_RESOURCES) => {
    return `${API_URL}${resource}?api_key=${environment.API_KEY}`;
};

export const buildImageUrl = (path: string, size: API_IMAGE_SIZE) => {
    return `${IMAGE_API_URL}/${size}${path}`;
};
