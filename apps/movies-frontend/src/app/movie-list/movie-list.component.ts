import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SEPList, SEPMovie } from '../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';

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
  //@ViewChild('dt') table: Table;
  @ViewChild('dt') table: Table;

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    void this.getPopularMovies();
    this.getAllMovies();
  }

  async getPopularMovies(): Promise<void> {
    const url = buildUrl(API_RESOURCES.POPULAR);
    const response = await firstValueFrom(
      this.httpClient.get<SEPList<SEPMovie>>(url)
    );
    this.movies = response.results;
    console.log(response);
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }

  public getAllMovies(): SEPMovie[] {
    return this.movies;
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
  onMovieChange(event: { value: any }) {
    this.table.filter(event.value, 'movies', 'in');
  }
}
