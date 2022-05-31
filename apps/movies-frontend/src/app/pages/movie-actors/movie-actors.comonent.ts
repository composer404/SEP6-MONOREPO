import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SEPActors } from '../../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { ActorsService } from '../../services/api/actors.service';

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

    constructor(private router: Router, private readonly actorService: ActorsService) {}

    ngOnInit(): void {}

    async getPopularActors(page: number): Promise<void> {
        const response = await this.actorService.getPopularActors(page);

        this.actors = response.results;
        if (response.total_pages > 10000) {
            this.totalElements = 10000;
            return;
        }
        this.totalElements = response.total_pages;
    }

    async onNameChange(page: number): Promise<void> {
        if (this.searchActor.length >= 3) {
            const response = await this.actorService.getActorsByTitle(page, this.searchActor);
            this.actors = response.results;
        }
    }

    public async onActorDetails() {
        this.router.navigateByUrl(`movie-actors/movie-actors-details/${this.selectedActor.id}`);
    }

    loadActors(event: LazyLoadEvent) {
        if (this.searchActor.length) {
            this.onNameChange(event.first / event.rows + 1);
            return;
        }
        this.getPopularActors(event.first / event.rows + 1);
    }
}
