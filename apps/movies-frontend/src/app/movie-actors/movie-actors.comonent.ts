import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SEPActors, SEPList, SEPMovie, SEPMovieDetails } from '../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-actors',
    templateUrl: './movie-actors.component.html',
    styleUrls: ['./movie-actors.component.scss'],
})
export class MovieActorsComponent implements OnInit {
    actors: SEPActors[];
    loading: boolean = true;
    first = 0;
    rows = 10;
    selectedActor: SEPActors;
    searchActor: string = '';
    @ViewChild('dt') table: Table;
    constructor(
        private readonly httpClient: HttpClient,
        private primengConfig: PrimeNGConfig,

        private readonly route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        void this.getActors();
    }

    async getActors(): Promise<void> {
        const url = buildUrl(API_RESOURCES.ACTOR);
        const response = await firstValueFrom(this.httpClient.get<SEPList<SEPActors>>(url));
        this.actors = response.results;
        console.log(response);
    }

    async onNameChange(): Promise<void> {
        if (this.searchActor.length >= 3) {
            const url = buildUrl(API_RESOURCES.SEARCHACTOR);
            const response = await firstValueFrom(
                this.httpClient.get<SEPList<SEPActors>>(url, {
                    params: {
                        query: this.searchActor,
                    },
                }),
            );
            console.log(response);
            this.actors = response.results;
        }
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
        return this.actors ? this.first === this.actors.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.actors ? this.first === 0 : true;
    }
    onMovieChange(event) {
        this.table.filter(event.value, 'movies', 'in');
    }

    public async onActorDetails() {
        console.log(this.selectedActor);
        this.router.navigateByUrl(`movie-actors/movie-actors-details/${this.selectedActor.id}`);
    }
}
