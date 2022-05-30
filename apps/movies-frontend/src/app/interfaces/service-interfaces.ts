export interface IMovieService {
    addToToplist(toplistId: string, config: any): Promise<boolean>;
}
