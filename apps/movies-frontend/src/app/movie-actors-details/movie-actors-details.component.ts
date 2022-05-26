import { API_IMAGE_SIZE, API_RESOURCES, buildImageUrl, buildPersonUrl, buildUrl } from '../shared/utils/api-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    SEPActors,
    SEPActorsDetails,
    SEPCast,
    SEPCastList,
    SEPCredits,
    SEPList,
    SEPMovie,
    SEPMovieDetails,
} from '../shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-actors-details',
    templateUrl: './movie-actors-details.component.html',
    styleUrls: ['./movie-actors-details.component.scss'],
})
export class MovieActorsDetailsComponent implements OnInit {
    actorDetails: SEPActorsDetails;
    loading: boolean = true;
    moviesByActor: SEPMovie;
    credits: SEPCastList;
    @ViewChild('dt') table: Table;
    first = 0;
    rows = 10;
    actorMov: SEPCast[];

    constructor(
        private readonly httpClient: HttpClient,
        private primengConfig: PrimeNGConfig,
        private readonly route: ActivatedRoute,
    ) {}
    searchVal: string = '';

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.route.params.subscribe(async (params) => {
            await this.getActorsDetails(params.id);
        });
        this.route.params.subscribe(async (params) => {
            await this.getMoviesByActor(params.id);
        });
    }

    public async getActorsDetails(id: number): Promise<void> {
        console.log(id);
        const firstPart = API_RESOURCES.ACTORDETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPActorsDetails>(url));
        console.log(response);
        response.profile_path = buildImageUrl(response.profile_path, API_IMAGE_SIZE.ORIGINAL);
        this.actorDetails = response;
    }

    public async getMoviesByActor(id: number): Promise<void> {
        const firstPart = API_RESOURCES.ACTORDETAILS + `/${id}` + API_RESOURCES.MOVIECREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPCastList>(url));
        console.log(response);
        this.credits = response;
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
        return this.actorMov ? this.first === this.actorMov.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.actorMov ? this.first === 0 : true;
    }
    onMovieChange(event) {
        this.table.filter(event.value, 'movieByActor', 'in');
    }
}
