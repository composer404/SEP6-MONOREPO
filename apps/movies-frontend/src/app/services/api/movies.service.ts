import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';
import { IMovieService } from '../../interfaces/movie-service.interface';
import { SEPMovie, SEPMovieDetails, SEPList } from '../../shared/interfaces/interfaces';
import { API_RESOURCES, buildUrl } from '../../shared/utils/api-config';

@Injectable({
    providedIn: 'root',
})
export class MoviesService implements IMovieService {
    constructor(private readonly httpClient: HttpClient) {}

    async addToToplist(toplistId: string, config: any): Promise<boolean> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}/${toplistId}/movie/add`;
        return firstValueFrom(
            this.httpClient.put<boolean>(url, {
                apiId: config.data.movieApiId,
                title: config.data.title,
                posterPath: config.data.posterPath,
            }),
        );
    }

    async loadLocalMovie(apiId: number): Promise<SEPMovie> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.movies}/${apiId}`;
        return firstValueFrom(this.httpClient.get<SEPMovie | undefined>(url));
    }

    async getDetails(id: number): Promise<SEPMovieDetails> {
        const firstPart = API_RESOURCES.DETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        return firstValueFrom(this.httpClient.get<SEPMovieDetails>(url));
    }

    async getPopularMovies(page: number): Promise<SEPList<SEPMovie>> {
        const url = buildUrl(API_RESOURCES.POPULAR);
        return firstValueFrom(
            this.httpClient.get<SEPList<SEPMovie>>(url, {
                params: {
                    page,
                },
            }),
        );
    }

    async getMoviesByTitle(page: number, searchValue: string): Promise<SEPList<SEPMovie>> {
        const url = buildUrl(API_RESOURCES.SEARCH);
        return firstValueFrom(
            this.httpClient.get<SEPList<SEPMovie>>(url, {
                params: {
                    query: searchValue,
                    page,
                },
            }),
        );
    }
}
