import { Component, OnInit } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SEPComment, UserProfile, SEPRating } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth/auth.service';
import { SEPMovieDetails, SEPMovie, SEPCastList, SEPCast } from '../../shared/interfaces/interfaces';
import { AddToToplistModalComponent } from './components/add-to-toplist-modal/add-to-toplist-modal.component';
import { ActorsService } from '../../services/api/actors.service';
import { CommentsService } from '../../services/api/comments.service';
import { InfoService } from '../../services/api/info.service';
import { MoviesService } from '../../services/api/movies.service';
import { RatingService } from '../../services/api/ratings.service';

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

    constructor(
        private readonly route: ActivatedRoute,
        private readonly dialogService: DialogService,
        private readonly router: Router,
        private readonly infoService: InfoService,
        private readonly authService: AuthService,
        private readonly ratingsService: RatingService,
        private readonly commentsService: CommentsService,
        private readonly movieService: MoviesService,
        private readonly actorService: ActorsService,
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

    async getDetails(id: number): Promise<void> {
        const response = await this.movieService.getDetails(id);
        this.movieDetails = response;
    }

    async getActorMovies(id: number): Promise<void> {
        const response = await this.actorService.getActorMovies(id);
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

    private async loadLocalMovie(apiId: number): Promise<void> {
        const response = await this.movieService.loadLocalMovie(apiId);
        if (response) {
            this.localMovie = response;
            this.comments = response.comments;
            this.ratings = response.ratings;
            this.checkIfRating();
            this.caluclatePlatformRatingAverage();
        }
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
        const response = await this.commentsService.createComment(this.commentText, {
            apiId: this.movieDetails.id,
            title: this.movieDetails.title,
            posterPath: this.movieDetails.poster_path,
        });

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

        const response = await this.ratingsService.createRating(this.rating, {
            apiId: this.movieDetails.id,
            title: this.movieDetails.title,
            posterPath: this.movieDetails.poster_path,
        });

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
        const response = await this.commentsService.loadCommentById(commentId);

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
        const response = await this.ratingsService.loadRatingById(ratingId);

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
