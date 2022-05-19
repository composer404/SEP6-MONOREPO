import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SEPList, SEPMovie } from '../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

//import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
    movies: SEPMovie[];
    loading: boolean = true;
    first = 0;
    rows = 10;
    selectedMovie: SEPMovie;
    @ViewChild('dt') table: Table;

    constructor(
        private router: Router,
        private readonly httpClient: HttpClient,
        private primengConfig: PrimeNGConfig,
    ) {}
    searchVal: string = '';

    ngOnInit(): void {
        void this.getPopularMovies();
        this.primengConfig.ripple = true;
    }

    async getPopularMovies(): Promise<void> {
        const url = buildUrl(API_RESOURCES.POPULAR);
        const response = await firstValueFrom(this.httpClient.get<SEPList<SEPMovie>>(url));
        this.movies = response.results;
        console.log(response);
    }

    async onTitleChange(): Promise<void> {
        if (this.searchVal.length >= 3) {
            const url = buildUrl(API_RESOURCES.SEARCH);
            const response = await firstValueFrom(
                this.httpClient.get<SEPList<SEPMovie>>(url, {
                    params: {
                        query: this.searchVal,
                    },
                }),
            );
            console.log(response);
            this.movies = response.results;
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
        return this.movies ? this.first === this.movies.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.movies ? this.first === 0 : true;
    }
    onMovieChange(event) {
        this.table.filter(event.value, 'movies', 'in');
    }

    public async onDetails() {
        console.log(this.selectedMovie);
        this.router.navigateByUrl(`movie-list/movie-details/${this.selectedMovie.id}`); //for the routing to another page
    }
}
