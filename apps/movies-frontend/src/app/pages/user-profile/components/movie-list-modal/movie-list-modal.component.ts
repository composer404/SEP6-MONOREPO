import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { firstValueFrom, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SEPToplist, SEPToplistDetails } from '../../../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../../../interfaces/local-api-endpoints';
import { AuthService } from '../../../../services/auth/auth.service';
import { InfoService } from '../../../../services/info.service';
import { SEPMovie } from '../../../../shared/interfaces/interfaces';

@Component({
    selector: 'app-movie-list.modal',
    templateUrl: './movie-list-modal.component.html',
    styleUrls: ['./movie-list-modal.component.scss'],
})
export class MovieListModalComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    movies: SEPMovie[];
    isProfileOwner: boolean;

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly infoService: InfoService,
        private readonly authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.loadMoviesForToplist(this.config.data.toplistId);
        this.isProfileOwner = this.config.data.isProfileOwner;
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    loadMoviesForToplist(toplistId: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.toplistFull}/${toplistId}`;
        this.subscriptions.push(
            this.httpClient.get<SEPToplistDetails>(url).subscribe((response) => {
                if (!response) {
                    return;
                }
                this.movies = response.movies;
            }),
        );
    }

    navigateToMovieView(movieApiId: string) {
        this.ref.close(false);
        void this.router.navigate([`movie-list/movie-details/${movieApiId}`]);
    }

    async removeMovieFromToplist(apiId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}/${this.config.data.toplistId}/movie/${apiId}/remove`;
        const reponse = await firstValueFrom(this.httpClient.put<boolean>(url, {}));

        if (!reponse) {
            this.infoService.error('Cannot remove movie from the toplist. Try again later');
            return;
        }

        this.movies = this.movies.filter((element) => {
            return element.apiId !== apiId;
        });
    }
}
