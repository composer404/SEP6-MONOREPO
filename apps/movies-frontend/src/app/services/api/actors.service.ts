import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IActorService } from '../../interfaces/actor-service.interface';
import { SEPActors, SEPActorsDetails, SEPCastList, SEPList } from '../../shared/interfaces/interfaces';
import { API_RESOURCES, buildUrl } from '../../shared/utils/api-config';

@Injectable({
    providedIn: 'root',
})
export class ActorsService implements IActorService {
    constructor(private readonly httpClient: HttpClient) {}

    async getActorMovies(id: number): Promise<SEPCastList> {
        const firstPart = API_RESOURCES.DETAILS + `/${id}` + API_RESOURCES.CREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        return firstValueFrom(this.httpClient.get<SEPCastList>(url));
    }

    async getActorsDetails(id: number): Promise<SEPActorsDetails> {
        const firstPart = API_RESOURCES.ACTORDETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        return firstValueFrom(this.httpClient.get<SEPActorsDetails>(url));
    }

    async getMoviesByActor(id: number): Promise<SEPCastList> {
        const firstPart = API_RESOURCES.ACTORDETAILS + `/${id}` + API_RESOURCES.MOVIECREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        return firstValueFrom(this.httpClient.get<SEPCastList>(url));
    }

    async getPopularActors(page: number): Promise<SEPList<SEPActors>> {
        const url = buildUrl(API_RESOURCES.ACTOR);
        return firstValueFrom(
            this.httpClient.get<SEPList<SEPActors>>(url, {
                params: {
                    page,
                },
            }),
        );
    }

    async getActorsByTitle(page: number, serachValue: string) {
        const url = buildUrl(API_RESOURCES.SEARCHACTOR);
        return firstValueFrom(
            this.httpClient.get<SEPList<SEPActors>>(url, {
                params: {
                    query: serachValue,
                    page,
                },
            }),
        );
    }
}
