import { API_RESOURCES, buildUrl } from '../../shared/utils/api-config';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SEPActors, SEPList } from '../../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-movie-actors',
    templateUrl: './movie-actors.component.html',
    styleUrls: ['./movie-actors.component.scss'],
})
export class MovieActorsComponent implements OnInit {
    actors: SEPActors[];
    totalElements: number;
    selectedActor: SEPActors;
    searchActor: string = '';

    constructor(private readonly httpClient: HttpClient, private router: Router) {}

    ngOnInit(): void {}

    async getPopularActors(page: number): Promise<void> {
        const url = buildUrl(API_RESOURCES.ACTOR);
        const response = await firstValueFrom(
            this.httpClient.get<SEPList<SEPActors>>(url, {
                params: {
                    page,
                },
            }),
        );

        this.actors = response.results;
        if (response.total_pages > 10000) {
            this.totalElements = 10000;
            return;
        }
        this.totalElements = response.total_pages;
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
            this.actors = response.results;
        }
    }

    public async onActorDetails() {
        this.router.navigateByUrl(`movie-actors/movie-actors-details/${this.selectedActor.id}`);
    }

    async onTitleChange(page: number): Promise<void> {
        if (!this.searchActor) {
            this.getPopularActors(1);
            return;
        }
        const url = buildUrl(API_RESOURCES.SEARCHACTOR);
        const response = await firstValueFrom(
            this.httpClient.get<SEPList<SEPActors>>(url, {
                params: {
                    query: this.searchActor,
                    page,
                },
            }),
        );
        this.actors = response.results;
        this.totalElements = response.total_pages;
    }

    loadActors(event: LazyLoadEvent) {
        if (this.searchActor.length) {
            this.onTitleChange(event.first / event.rows + 1);
            return;
        }
        this.getPopularActors(event.first / event.rows + 1);
    }
}
