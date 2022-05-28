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
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AddToToplistModalComponent } from './components/add-to-toplist-modal/add-to-toplist-modal.component';
import { SEPApiCreatedObject, SEPComment, SEPRating, UserProfile } from '../interfaces/interfaces';
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

    firstCrew = 0;
    rowsCrew = 10;
    ratings: SEPRating[];

    platformRatingAverage: number;
    platformRatingVotes: number;
    ratingCreated: boolean;

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
            await this.getActorMovies(params.id);
            this.loadLocalMovie(params.id);
        });
    }

    public async getDetails(id: number): Promise<void> {
        const firstPart = API_RESOURCES.DETAILS + `/${id}`;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPMovieDetails>(url));
        this.movieDetails = response;
    }

    async getActorMovies(id: number): Promise<void> {
        const firstPart = API_RESOURCES.DETAILS + `/${id}` + API_RESOURCES.CREDITS;
        const url = `${buildUrl(firstPart as any)}`;
        const response = await firstValueFrom(this.httpClient.get<SEPCastList>(url));
        this.credits = response;
    }

    getDirector() {
        return this.credits.crew.filter((element) => {
            return element.job === `Director`;
        });
    }

    async onCastDetails() {
        this.router.navigate([`movie-actors/movie-actors-details/${this.selectedCast.id}`]);
    }

    private loadLocalMovie(apiId: number) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.movies}/${apiId}`;
        this.httpClient.get<SEPMovie | undefined>(url).subscribe((response) => {
            if (response) {
                this.localMovie = response;
                this.comments = response.comments;
                this.ratings = response.ratings;
                this.checkIfRating();
                this.caluclatePlatformRatingAverage();
            }
        });
    }

    checkIfRating() {
        this.ratings.forEach((rating) => {
            if (rating.authorId === this.userProfile.id) {
                this.ratingCreated = true;
                this.rating = rating.rating;
            }
        });
    }

    caluclatePlatformRatingAverage() {
        if (!this.ratings.length) {
            this.platformRatingAverage = 0;
            this.platformRatingVotes = 0;
            return;
        }

        this.platformRatingVotes = this.ratings.length;
        let average = 0;
        this.ratings.forEach((rating) => {
            average += rating.rating;
        });
        this.platformRatingAverage = average / this.platformRatingVotes;
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
        this.commentText = ``;
        this.loadCommentById(response.id);
    }

    async createRating(): Promise<void> {
        if (this.ratingCreated) {
            return;
        }

        const response = await firstValueFrom(
            this.httpClient.post<{ id: string }>(`${environment.localApiUrl}${LOCAL_API_SERVICES.ratings}`, {
                rating: this.rating,
                movie: {
                    apiId: this.movieDetails.id,
                    title: this.movieDetails.title,
                    posterPath: this.movieDetails.poster_path,
                },
            }),
        );

        if (!response) {
            this.infoService.error(`Cannot create a rating. Try again later`);
            return;
        }
        this.loadRatingById(response.id);
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
        if (!this.comments) {
            this.comments = [];
        }
        this.comments.push(response);
    }

    async loadRatingById(ratingId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.ratingsFull}/${ratingId}`;
        const response = await firstValueFrom(this.httpClient.get<SEPRating>(url));

        if (!response) {
            this.infoService.error(`Cannot load a rating. Try again later`);
            return;
        }

        if (!this.ratings) {
            this.ratings = [];
        }

        this.ratings.push(response);
        this.caluclatePlatformRatingAverage();
        this.checkIfRating();
    }

    async getCommentById(id: string) {
        const [comment] = this.comments.filter((element) => {
            return element.id === id;
        });
        return comment;
    }
}
