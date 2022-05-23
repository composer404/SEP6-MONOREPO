import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SEPList, SEPMovie, SEPMovieDetails } from '../shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    movie: SEPMovieDetails;
    loading: boolean = true;

    constructor(
        private readonly httpClient: HttpClient,
        private primengConfig: PrimeNGConfig,
        private readonly route: ActivatedRoute,
    ) {}
    searchVal: string = '';

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.route.params.subscribe(async (params) => {
            await this.getDetails(params.id);
        });
    }

    public async getDetails(id: number): Promise<void> {
        console.log(id);
        const firstPart = API_RESOURCES.DETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPMovieDetails>(url));
        console.log(response);
        this.movie = response;
    }
}
