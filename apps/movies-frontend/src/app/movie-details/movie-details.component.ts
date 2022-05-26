import { API_RESOURCES, buildUrl } from '../shared/utils/api-config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    SEPActors,
    SEPCast,
    SEPCastList,
    SEPCredits,
    SEPList,
    SEPMovie,
    SEPMovieDetails,
} from '../shared/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../interfaces/local-api-endpoints';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AddToToplistModalComponent } from './components/add-to-toplist-modal/add-to-toplist-modal.component';
import { SEPApiCreatedObject, SEPComment, SEPDatabaseObject, UserProfile } from '../interfaces/interfaces';
import { InfoService } from '../services/info.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    movieDetails: SEPMovieDetails;
    localMovie: SEPMovie;

    comments: SEPComment[];
    userProfile: UserProfile;
    isProfileOwner: boolean;

    loading: boolean = true;
    credits: SEPCastList;
    actor: SEPCast[];
    selectedCast: SEPCast;
    first = 0;
    rows = 10;
    selectedMovie: SEPMovie;
    selectedActor: SEPActors;
    rating: number;
    commentText: string;

    @ViewChild('dt') table: Table;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly route: ActivatedRoute,
        private readonly dialogService: DialogService,
        private router: Router,
        private infoService: InfoService,
        private authService: AuthService,
    ) {}
    searchVal: string = '';

    async ngOnInit(): Promise<void> {
        this.userProfile = await this.authService.getProfile();
        this.isProfileOwner = await this.authService.isProfileOwner(this.userProfile.id);

        this.route.params.subscribe(async (params) => {
            await this.getDetails(params.id);
            this.loadLocalMovie(params.id);
        });
        this.route.params.subscribe(async (params) => {
            await this.getActorMovies(params.id);
        });
    }

    public async getDetails(id: number): Promise<void> {
        console.log(id);
        const firstPart = API_RESOURCES.DETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPMovieDetails>(url));
        console.log(response);
        this.movieDetails = response;
    }

    public async getActorMovies(id: number): Promise<void> {
        const firstPart = API_RESOURCES.DETAILS + `/${id}` + API_RESOURCES.CREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPCastList>(url));
        console.log(response);
        this.credits = response;
    }

    createRating(): void {
        this.httpClient
            .post<{ id: string }>(`${environment.localApiUrl}${LOCAL_API_SERVICES.ratings}`, {
                rating: this.rating,
                movie: {
                    apiId: this.movieDetails.id,
                    title: this.movieDetails.title,
                    posterPath: this.movieDetails.poster_path,
                },
            })
            .subscribe((response) => {
                if (!response?.id) {
                    //error
                    return;
                }
            });
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
        return this.actor ? this.first === this.actor.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.actor ? this.first === 0 : true;
    }
    onMovieChange(event) {
        this.table.filter(event.value, 'actor', 'in');
    }

    public async onCastDetails() {
        console.log(this.selectedCast);
        this.router.navigateByUrl(
            `movie-details/${this.selectedCast.id}/movie-actors-details/${this.selectedActor.id}`,
        );
    }

    private loadLocalMovie(apiId: number) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.movies}/${apiId}`;
        this.httpClient.get<SEPMovie | undefined>(url).subscribe((response) => {
            if (response) {
                this.localMovie = response;
                this.comments = response.comments;
            }
        });
    }

    addToToplist() {
        this.dialogService.open(AddToToplistModalComponent, {
            header: `Add movie to your toplist`,
            width: `30%`,
            data: {
                movieApiId: this.movieDetails.id,
                title: this.movieDetails.title,
                posterPath: this.movieDetails.poster_path,
            },
        });
    }

    async addComment(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.comments}`;
        const response = await firstValueFrom(
            this.httpClient.post<SEPApiCreatedObject>(url, {
                content: this.commentText,
                movie: {
                    apiId: this.movieDetails.id,
                    title: this.movieDetails.title,
                    posterPath: this.movieDetails.poster_path,
                },
            }),
        );

        if (!response) {
            this.infoService.error(`Cannot create a comment. Try again later`);
            return;
        }
        this.loadCommentById(response.id);
    }

    async removeComment(commentId: string): Promise<void> {
        this.comments = this.comments.filter((element) => {
            return element.id !== commentId;
        });
    }

    async loadCommentById(commentId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.commentsFull}/${commentId}`;
        const response = await firstValueFrom(this.httpClient.get<SEPComment>(url));

        if (!response) {
            this.infoService.error(`Cannot load a comment. Try again later`);
            return;
        }
        console.log(response);
        this.comments.push(response);
    }

    async getCommentById(id: string) {
        const [comment] = this.comments.filter((element) => {
            return element.id === id;
        });
        return comment;
    }
}
