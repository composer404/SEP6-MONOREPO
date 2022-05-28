import { API_IMAGE_SIZE, API_RESOURCES, buildImageUrl, buildUrl } from '../shared/utils/api-config';
import { Component, OnInit } from '@angular/core';
import { SEPActorsDetails, SEPCast, SEPCastList, SEPMovie } from '../shared/interfaces/interfaces';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-actors-details',
    templateUrl: './movie-actors-details.component.html',
    styleUrls: ['./movie-actors-details.component.scss'],
})
export class MovieActorsDetailsComponent implements OnInit {
    actorDetails: SEPActorsDetails;
    selectedMovie: SEPMovie;
    credits: SEPCastList;

    rowsCrew = 0;
    firstCrew = 0;
    first = 0;
    rows = 10;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            await this.getActorsDetails(params.id);
            await this.getMoviesByActor(params.id);
        });
    }

    async getActorsDetails(id: number): Promise<void> {
        const firstPart = API_RESOURCES.ACTORDETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPActorsDetails>(url));
        this.actorDetails = response;
    }

    async getMoviesByActor(id: number): Promise<void> {
        const firstPart = API_RESOURCES.ACTORDETAILS + `/${id}` + API_RESOURCES.MOVIECREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPCastList>(url));
        this.credits = response;
    }

    onMovieDetails() {
        this.router.navigate([`movie-list/movie-details/${this.selectedMovie.id}`]);
    }
}
