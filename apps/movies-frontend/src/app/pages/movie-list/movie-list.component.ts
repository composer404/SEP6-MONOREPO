import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SEPMovie } from '../../shared/interfaces/interfaces';

import { LazyLoadEvent } from 'primeng/api';
import { MoviesService } from '../../services/api/movies.service';

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

    constructor(private router: Router, private readonly movieService: MoviesService) {}
    searchVal: string = '';

    ngOnInit(): void {}

    async getPopularMovies(page: number): Promise<void> {
        const response = await this.movieService.getPopularMovies(page);

        this.movies = response.results;
        if (response.total_pages > 10000) {
            this.totalElements = 10000;
            return;
        }
        this.totalElements = response.total_pages;
    }

    async onTitleChange(page: number): Promise<void> {
        if (!this.searchVal) {
            this.getPopularMovies(1);
            return;
        }
        const response = await this.movieService.getMoviesByTitle(page, this.searchVal);
        this.movies = response.results;
        this.totalElements = response.total_pages;
    }

    loadMovies(event: LazyLoadEvent) {
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
