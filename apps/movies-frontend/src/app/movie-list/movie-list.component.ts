import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SEPActors, SEPList, SEPMovie, SEPMovieDetails } from '../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
    movies: SEPMovie[];
    datasource: SEPMovie[];
    totalElements: number;
    first = 0;
    rows = 10;
    selectedMovie: SEPMovie;
    externalIds: Object = {};

    @ViewChild('dt') table: Table;

    constructor(private router: Router, private readonly httpClient: HttpClient) {}
    searchVal: string = '';

    ngOnInit(): void {}

    async getPopularMovies(page: number): Promise<void> {
        const url = buildUrl(API_RESOURCES.POPULAR);
        const response = await firstValueFrom(
            this.httpClient.get<SEPList<SEPMovie>>(url, {
                params: {
                    page,
                },
            }),
        );
        console.log(response);
        this.movies = response.results;
        if (response.total_pages > 5000) {
            this.totalElements = 5000;
            return;
        }
        this.totalElements = response.total_pages;
    }

    async onTitleChange(page: number): Promise<void> {
        if (!this.searchVal) {
            this.getPopularMovies(1);
            return;
        }
        const url = buildUrl(API_RESOURCES.SEARCH);
        const response = await firstValueFrom(
            this.httpClient.get<SEPList<SEPMovie>>(url, {
                params: {
                    query: this.searchVal,
                    page,
                },
            }),
        );
        this.movies = response.results;
        this.totalElements = response.total_pages;
    }

    loadMovies(event: LazyLoadEvent) {
        console.log(`event`, event);
        if (this.searchVal.length) {
            this.onTitleChange(event.first / event.rows + 1);
            return;
        }
        this.getPopularMovies(event.first / event.rows + 1);
    }

    onDetails() {
        void this.router.navigateByUrl(`movie-list/movie-details/${this.selectedMovie.id}`);
    }
}
