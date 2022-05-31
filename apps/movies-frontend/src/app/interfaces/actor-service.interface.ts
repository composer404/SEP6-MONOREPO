import { SEPActorsDetails, SEPCastList } from '../shared/interfaces/interfaces';

export interface IActorService {
    getActorMovies(id: number): Promise<SEPCastList>;
    getActorsDetails(id: number): Promise<SEPActorsDetails>;
    getMoviesByActor(id: number): Promise<SEPCastList>;
}
