import { SEPMovie, SEPMovieDetails } from '../shared/interfaces/interfaces';

export interface IMovieService {
    addToToplist(toplistId: string, config: any): Promise<boolean>;
    loadLocalMovie(apiId: number): Promise<SEPMovie>;
    getDetails(id: number): Promise<SEPMovieDetails>;
}
