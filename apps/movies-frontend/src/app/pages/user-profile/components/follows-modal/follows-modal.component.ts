import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SEPUser, SEP_FOLLOWS_TYPES } from 'src/app/interfaces/interfaces';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api-endpoints';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-follows-modal',
    templateUrl: './follows-modal.component.html',
    styleUrls: ['./follows-modal.component.scss'],
})
export class FollowsModalComponent implements OnInit {
    follows: SEPUser[];

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        if (this.config.data.type === SEP_FOLLOWS_TYPES.followers) {
            this.getFollowersForUser(this.config.data.id);
        }

        if (this.config.data.type === SEP_FOLLOWS_TYPES.following) {
            this.getFollowingForUser(this.config.data.id);
        }
    }

    getFollowersForUser(userId: string): void {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followers}/${userId}`;
        this.httpClient.get<SEPUser[] | null>(url).subscribe((followers) => {
            if (followers) {
                this.follows = followers;
            }
        });
    }

    getFollowingForUser(userId: string): void {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.following}/${userId}`;
        this.httpClient.get<SEPUser[] | null>(url).subscribe((following) => {
            if (following) {
                this.follows = following;
            }
        });
    }

    navigateToUserProfile(userId: string): void {
        void this.router.navigate([`profile/${userId}`]);
        this.close();
    }

    close(): void {
        this.ref.close();
    }
}
