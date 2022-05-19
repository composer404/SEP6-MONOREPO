import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';
import { SEPToplist, SEPUser, SEP_FOLLOWS_TYPES } from 'src/app/interfaces/interfaces';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api-endpoints';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { FollowsModalComponent } from './components/follows-modal/follows-modal.component';

@Component({
    selector: 'app-user-board',
    templateUrl: './user-board.component.html',
    styleUrls: ['./user-board.component.scss'],
    providers: [DialogService],
})
export class UserBoardComponent implements OnInit {
    user: SEPUser;
    isProfileOwner: boolean;
    followersNumber: number;
    followingNumber: number;
    isFollowing: boolean;
    toplists: SEPToplist[];

    constructor(
        private readonly dialogService: DialogService,
        private readonly authService: AuthService, 
        private readonly route: ActivatedRoute, 
        private readonly httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            if (params?.id) {
                this.isProfileOwner = await this.authService.isProfileOwner(params.id);
                if (!this.isProfileOwner) {
                    await this.checkIsFollowing(params.id);
                }
                this.getClientById(params.id);

            }
        })
    }

    getClientById(id: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.users}/${id}`
        this.httpClient.get<SEPUser>(url).subscribe((user) => {
            if (user) {
                this.user = user;
                this.getNumberOfFollowers();
                this.getNumberOfFollowing();
                this.getToplistForUser();
            }
        });
    }

    getNumberOfFollowers() {
        console.log(`here`);
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followersNumber}/${this.user.id}`
        console.log(url)
        this.httpClient.get<number | null>(url).subscribe((followers) => {
            this.followersNumber = followers;
        });
    }

    getNumberOfFollowing() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followingNumber}/${this.user.id}`
        this.httpClient.get<number | null>(url).subscribe((following) => {
            this.followingNumber = following;
        });
    }
    
    getToplistForUser() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.toplistUser}/${this.user.id}`
        this.httpClient.get<SEPToplist[] | null>(url).subscribe((toplists) => {
            console.log(`top lists`, toplists);
            if (toplists) {
                this.toplists = toplists;
            }
        });
    }

    async checkIsFollowing(userId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.checkFollowing}/${userId}`
        const result = await firstValueFrom(this.httpClient.get<boolean>(url));
        console.log(`result`, result);
        this.isFollowing = result;
    }

    async followUser(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.follow}`
        const result = await firstValueFrom(this.httpClient.post<boolean>(url, {
            followingId: this.user.id,
        }));
        console.log(result);
        if (result) {
            this.isFollowing = true;
            ++this.followersNumber;
        }
    }

    async unfollowUser(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.follow}`
        const result = await firstValueFrom(this.httpClient.delete<boolean>(url, {
            body: {
                followingId: this.user.id,
            }
        }));
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
            }
        });
    }

    showFollowing(): void {
        this.dialogService.open(FollowsModalComponent, {
            header: `Followers`,
            width: `30%`,
            data: {
                type: SEP_FOLLOWS_TYPES.following,
                id: this.user.id,
            }
        });
    }
}
