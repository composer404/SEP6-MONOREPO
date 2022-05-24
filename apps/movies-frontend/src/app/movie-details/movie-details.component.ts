import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    SEPActors,
    SEPCast,
    SEPCastList,
    SEPCredits,
    SEPList,
    SEPMovie,
    SEPMovieDetails,
} from '../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../interfaces/local-api-endpoints';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    movieDetails: SEPMovieDetails;
    loading: boolean = true;
    credits: SEPCastList;
    actor: SEPCast[];
    selectedCast: SEPCast;
    first = 0;
    rows = 10;
    selectedMovie: SEPMovie;
    selectedActor: SEPActors;
    rating: number;

    @ViewChild('dt') table: Table;

    constructor(
        private readonly httpClient: HttpClient,
        private primengConfig: PrimeNGConfig,
        private readonly route: ActivatedRoute,
        private router: Router,
    ) {}
    searchVal: string = '';

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.route.params.subscribe(async (params) => {
            await this.getDetails(params.id);
        });
        this.route.params.subscribe(async (params) => {
            await this.getActorMovies(params.id);
        });
    }

    public async getDetails(id: number): Promise<void> {
        console.log(id);
        const firstPart = API_RESOURCES.DETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPMovieDetails>(url));
        console.log(response);
        this.movieDetails = response;
    }

    public async getActorMovies(id: number): Promise<void> {
        const firstPart = API_RESOURCES.DETAILS + `/${id}` + API_RESOURCES.CREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPCastList>(url));
        console.log(response);
        this.credits = response;
    }

    createRating(): void {
        this.httpClient
            .post<{ id: string }>(`${environment.localApiUrl}${LOCAL_API_SERVICES.ratings}`, {
                rating: this.rating,
                movie: {
                    apiId: this.movieDetails.id,
                    title: this.movieDetails.title,
                    posterPath: this.movieDetails.poster_path,
                },
            })
            .subscribe((response) => {
                if (!response?.id) {
                    //error
                    return;
                }
            });
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.actor ? this.first === this.actor.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.actor ? this.first === 0 : true;
    }
    onMovieChange(event) {
        this.table.filter(event.value, 'actor', 'in');
    }

    public async onCastDetails() {
        console.log(this.selectedCast);
        this.router.navigateByUrl(
            `movie-details/${this.selectedCast.id}/movie-actors-details/${this.selectedActor.id}`,
        );
    }
}
