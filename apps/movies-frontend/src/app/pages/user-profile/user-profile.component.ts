import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';
import {
    SEPComment,
    SEPRating,
    SEPToplist,
    SEPUser,
    SEP_FOLLOWS_TYPES,
    SEP_PROFILE_SECTIONS,
} from 'src/app/interfaces/interfaces';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api-endpoints';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { FollowsModalComponent } from './components/follows-modal/follows-modal.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    providers: [DialogService],
})
export class UserProfileComponent implements OnInit {
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

    constructor(
        private readonly dialogService: DialogService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly httpClient: HttpClient,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            if (params?.id) {
                this.isProfileOwner = await this.authService.isProfileOwner(params.id);
                this.initMenuItems();
                if (!this.isProfileOwner) {
                    await this.checkIsFollowing(params.id);
                }
                this.getClientById(params.id);
            }
        });
    }

    getClientById(id: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.users}/${id}`;
        this.httpClient.get<SEPUser>(url).subscribe((user) => {
            if (user) {
                this.user = user;
                this.getNumberOfFollowers();
                this.getNumberOfFollowing();
                this.getToplistForUser();
                this.getCommentsForUser();
                this.getRatingsForUser();
            }
        });
    }

    getNumberOfFollowers() {
        console.log(`here`);
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followersNumber}/${this.user.id}`;
        console.log(url);
        this.httpClient.get<number | null>(url).subscribe((followers) => {
            this.followersNumber = followers;
        });
    }

    getNumberOfFollowing() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followingNumber}/${this.user.id}`;
        this.httpClient.get<number | null>(url).subscribe((following) => {
            this.followingNumber = following;
        });
    }

    getToplistForUser() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.toplistUser}/${this.user.id}`;
        this.httpClient.get<SEPToplist[] | null>(url).subscribe((toplists) => {
            if (toplists) {
                this.toplists = toplists;
            }
        });
    }

    async getRatingsForUser(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.ratings}/${this.user.id}`;
        this.httpClient.get<SEPRating[] | null>(url).subscribe((ratings) => {
            if (ratings) {
                this.ratings = ratings;
            }
        });
    }

    async getCommentsForUser(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.comments}/${this.user.id}`;
        this.httpClient.get<SEPComment[] | null>(url).subscribe((comments) => {
            if (comments) {
                this.comments = comments;
            }
        });
    }

    async checkIsFollowing(userId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.checkFollowing}/${userId}`;
        const result = await firstValueFrom(this.httpClient.get<boolean>(url));
        this.isFollowing = result;
    }

    async followUser(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.follow}`;
        const result = await firstValueFrom(
            this.httpClient.post<boolean>(url, {
                followingId: this.user.id,
            }),
        );
        console.log(result);
        if (result) {
            this.isFollowing = true;
            ++this.followersNumber;
        }
    }

    async unfollowUser(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.follow}`;
        const result = await firstValueFrom(
            this.httpClient.delete<boolean>(url, {
                body: {
                    followingId: this.user.id,
                },
            }),
        );
        console.log(result);
        if (result) {
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
