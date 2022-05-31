import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SEPRating, SEPApiCreatedObject } from '../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';
import { IRatingService } from '../../interfaces/rating-service.interface';
import { SEPMovieShort } from '../../shared/interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})
export class RatingService implements IRatingService {
    constructor(private readonly httpClient: HttpClient) {}

    async loadRatingById(ratingId: string): Promise<SEPRating> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.ratingsFull}/${ratingId}`;
        return firstValueFrom(this.httpClient.get<SEPRating>(url));
    }

    async createRating(rating: number, movie: SEPMovieShort): Promise<SEPApiCreatedObject> {
        return firstValueFrom(
            this.httpClient.post<SEPApiCreatedObject>(`${environment.localApiUrl}${LOCAL_API_SERVICES.ratings}`, {
                rating: rating,
                movie: {
                    apiId: movie.apiId,
                    title: movie.title,
                    posterPath: movie.posterPath,
                },
            }),
        );
    }

    async getRatingsForUser(userId: string): Promise<SEPRating[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.ratings}/${userId}`;
        return firstValueFrom(this.httpClient.get<SEPRating[] | null>(url));
    }
}
