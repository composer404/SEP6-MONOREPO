import { SEPMovieShort } from '../shared/interfaces/interfaces';
import { SEPApiCreatedObject, SEPComment } from './interfaces';

export interface ICommentService {
    loadCommentById(ratingId: string): Promise<SEPComment>;
    createComment(comment: string, movie: SEPMovieShort): Promise<SEPApiCreatedObject>;
}
