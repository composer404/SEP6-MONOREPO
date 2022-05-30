import { Component, OnInit } from '@angular/core';
import { SEPActorsDetails, SEPCastList, SEPMovie } from '../../shared/interfaces/interfaces';

import { ActivatedRoute, Router } from '@angular/router';
import { ActorsService } from '../../services/api/actors.service';

@Component({
    selector: 'app-movie-actors-details',
    templateUrl: './movie-actors-details.component.html',
    styleUrls: ['./movie-actors-details.component.scss'],
})
export class MovieActorsDetailsComponent implements OnInit {
    actorDetails: SEPActorsDetails;
    selectedMovie: SEPMovie;
    credits: SEPCastList;

    rowsCrew = 0;
    firstCrew = 0;
    first = 0;
    rows = 10;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly actorsService: ActorsService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            await this.getActorsDetails(params.id);
            await this.getMoviesByActor(params.id);
        });
    }

    async getActorsDetails(id: number): Promise<void> {
        const response = await this.actorsService.getActorsDetails(id);
        this.actorDetails = response;
    }

    async getMoviesByActor(id: number): Promise<void> {
        const response = await this.actorsService.getMoviesByActor(id);
        this.credits = response;
    }

    onMovieDetails() {
        this.router.navigate([`movie-list/movie-details/${this.selectedMovie.id}`]);
    }
}
