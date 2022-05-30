import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { LOCAL_API_SERVICES } from '../interfaces/local-api-endpoints';
import { IMovieService } from '../interfaces/service-interfaces';

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
}
