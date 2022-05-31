import { SEPMovie, SEPMovieShort } from '../shared/interfaces/interfaces';
import { SEPApiCreatedObject, SEPRating } from './interfaces';

export interface IRatingService {
    loadRatingById(ratingId: string): Promise<SEPRating>;
    createRating(rating: number, movie: SEPMovieShort): Promise<SEPApiCreatedObject>;
}
