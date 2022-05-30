import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import {
    SEPComment,
    SEPRating,
    SEPToplist,
    SEPUser,
    SEP_FOLLOWS_TYPES,
    SEP_PROFILE_SECTIONS,
} from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentsService } from '../../services/api/comments.service';
import { RatingService } from '../../services/api/ratings.service';
import { ToplistService } from '../../services/api/toplist.service';
import { UserService } from '../../services/api/user.service';
import { FollowsModalComponent } from './components/follows-modal/follows-modal.component';
import { UpdateUserModalComponent } from './components/update-user-modal/update-user-modal.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
    user: SEPUser;
    isProfileOwner: boolean;
    followersNumber: number;
    followingNumber: number;
    isFollowing: boolean;
    activeSection: SEP_PROFILE_SECTIONS;

    toplists: SEPToplist[];
    comments: SEPComment[];
    ratings: SEPRating[];

    items: MenuItem[];

    sections = SEP_PROFILE_SECTIONS;
    subscriptions: Subscription[] = [];

    constructor(
        private readonly dialogService: DialogService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly ratingService: RatingService,
        private readonly commnetService: CommentsService,
        private readonly toplistSerivice: ToplistService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            if (params?.id) {
                this.isProfileOwner = await this.authService.isProfileOwner(params.id);
                this.initMenuItems();
                if (!this.isProfileOwner) {
                    await this.checkIsFollowing(params.id);
                }
                void this.getClientById(params.id);
            }
        });
    }
    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    async getClientById(id: string) {
        const response = await this.userService.getClientById(id);
        if (response) {
            this.user = response;
            void this.getNumberOfFollowers();
            void this.getNumberOfFollowing();
            void this.getToplistForUser();
            void this.getCommentsForUser();
            void this.getRatingsForUser();
        }
    }

    async getNumberOfFollowers() {
        const response = await this.userService.getNumberOfFollowers(this.user.id);
        this.followersNumber = response;
    }

    async getNumberOfFollowing() {
        const response = await this.userService.getNumberOfFollowing(this.user.id);
        this.followingNumber = response;
    }

    async getToplistForUser() {
        const response = await this.toplistSerivice.getToplistForUser(this.user.id);
        if (response) {
            this.toplists = response;
        }
    }

    async getRatingsForUser(): Promise<void> {
        const response = await this.ratingService.getRatingsForUser(this.user.id);
        if (response) {
            this.ratings = response;
        }
    }

    async getCommentsForUser(): Promise<void> {
        const response = await this.commnetService.getCommentsForUser(this.user.id);
        if (response) {
            this.comments = response;
        }
    }

    onRemoveToplist(id: string): void {
        this.toplists = this.toplists.filter((element) => {
            return element.id !== id;
        });
    }

    openUpdateProfileModal() {
        const ref = this.dialogService.open(UpdateUserModalComponent, {
            width: `40%`,
            data: {
                ...this.user,
            },
        });

        this.subscriptions.push(
            ref.onClose.subscribe((data) => {
                if (data) {
                    this.getClientById(data);
                }
            }),
        );
    }

    async checkIsFollowing(userId: string): Promise<void> {
        const reponse = await this.userService.checkIsFollowing(userId);
        this.isFollowing = reponse;
    }

    async followUser(): Promise<void> {
        const response = await this.userService.followUser(this.user.id);
        if (response) {
            this.isFollowing = true;
            ++this.followersNumber;
        }
    }

    async unfollowUser(): Promise<void> {
        const reponse = await this.userService.unfollowUser(this.user.id);
        if (reponse) {
            this.isFollowing = false;
            --this.followersNumber;
        }
    }

    showFollowers(): void {
        this.dialogService.open(FollowsModalComponent, {
            header: `Followers`,
            width: `40%`,
            data: {
                type: SEP_FOLLOWS_TYPES.followers,
                id: this.user.id,
            },
        });
    }

    showFollowing(): void {
        this.dialogService.open(FollowsModalComponent, {
            header: `Followers`,
            width: `30%`,
            data: {
                type: SEP_FOLLOWS_TYPES.following,
                id: this.user.id,
            },
        });
    }

    private openSection(section: SEP_PROFILE_SECTIONS) {
        this.activeSection = section;
    }

    private initMenuItems(): void {
        this.items = [
            {
                label: 'Toplists',
                icon: 'pi pi-fw pi-list',
                styleClass: `menu-item`,
                command: () => {
                    this.openSection(SEP_PROFILE_SECTIONS.toplists);
                },
            },
            {
                label: 'Comments',
                icon: 'pi pi-fw pi-comments',
                styleClass: `menu-item`,
                command: () => {
                    this.openSection(SEP_PROFILE_SECTIONS.comments);
                },
            },
            {
                label: 'Ratings',
                icon: 'pi pi-fw pi-star',
                styleClass: `menu-item`,
                command: () => {
                    this.openSection(SEP_PROFILE_SECTIONS.ratings);
                },
            },
        ];

        if (this.isProfileOwner) {
            this.items.push({
                label: 'Statistics',
                icon: `pi pi-fw pi-chart-bar`,
                styleClass: `menu-item`,
                command: () => {
                    this.openSection(SEP_PROFILE_SECTIONS.statistics);
                },
            });
        }

        this.openSection(SEP_PROFILE_SECTIONS.toplists);
    }
}
