import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICommentService } from '../../interfaces/comment-service.interface';
import { SEPComment, SEPApiCreatedObject } from '../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';
import { SEPMovieShort } from '../../shared/interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})
export class CommentsService implements ICommentService {
    constructor(private readonly httpClient: HttpClient) {}

    async loadCommentById(commentId: string): Promise<SEPComment> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.commentsFull}/${commentId}`;
        return firstValueFrom(this.httpClient.get<SEPComment>(url));
    }

    async createComment(comment: string, movie: SEPMovieShort): Promise<SEPApiCreatedObject> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.comments}`;
        return firstValueFrom(
            this.httpClient.post<SEPApiCreatedObject>(url, {
                content: comment,
                movie: {
                    apiId: movie.apiId,
                    title: movie.title,
                    posterPath: movie.posterPath,
                },
            }),
        );
    }

    async getCommentsForUser(userId: string): Promise<SEPComment[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.comments}/${userId}`;
        return firstValueFrom(this.httpClient.get<SEPComment[] | null>(url));
    }
}
