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
  movies: SEPMovie[] | undefined;
  @ViewChild('dt') table: Table | undefined;
  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    void this.getPopularMovies();
  }

  async getPopularMovies(): Promise<void> {
    const url = buildUrl(API_RESOURCES.POPULAR);
    const response = await firstValueFrom(
      this.httpClient.get<SEPList<SEPMovie>>(url)
    );

    console.log(response);
  }
}
