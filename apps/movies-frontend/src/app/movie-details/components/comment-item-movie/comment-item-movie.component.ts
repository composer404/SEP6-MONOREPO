import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SEPComment, SEP_USER_ACTIONS, UserProfile } from '../../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../../interfaces/local-api-endpoints';
import { InfoService } from '../../../services/info.service';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-comment-item-movie',
    templateUrl: './comment-item-movie.component.html',
    styleUrls: ['./comment-item-movie.component.scss'],
})
export class CommentItemMovieComponent implements OnDestroy {
    @Input()
    comment: SEPComment;

    @Input()
    userProfile: UserProfile;

    @Output()
    onRemove = new EventEmitter<string>();

    editMode: boolean;
    editedText: string;
    subscriptions: Subscription[] = [];

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    constructor(
        private readonly httpClient: HttpClient,
        private infoService: InfoService,
        private readonly router: Router,
        private dialogService: DialogService,
    ) {}

    showConfirmationDialog() {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            header: `Confirm action`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(async (data: SEP_USER_ACTIONS) => {
                if (data === SEP_USER_ACTIONS.confirm) {
                    await this.removeComment();
                }
            }),
        );
    }

    async removeComment(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.comments}/${this.comment.id}`;
        const response = await firstValueFrom(this.httpClient.delete<boolean>(url));
        console.log(`remvoe reponse`, response);
        if (!response) {
            this.infoService.error(`Cannot remove comment. Try again later`);
            return;
        }
        this.onRemove.emit(this.comment.id);
    }

    async saveComment(): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.comments}`;
        const response = firstValueFrom(
            this.httpClient.put(url, {
                commentId: this.comment.id,
                content: this.editedText,
            }),
        );

        if (!response) {
            this.infoService.error(`Cannot edit comment. Try again later`);
            return;
        }

        this.comment.content = this.editedText;
        this.comment.updatedAt = new Date().toISOString();
        this.editMode = false;
    }

    checkIfUpdated() {
        const createdDate = new Date(this.comment.createdAt);
        const updatedDate = new Date(this.comment.updatedAt);

        return (
            createdDate.getFullYear() === updatedDate.getFullYear() &&
            createdDate.getMonth() === updatedDate.getMonth() &&
            createdDate.getDate() === updatedDate.getDate() &&
            createdDate.getHours() === updatedDate.getHours() &&
            createdDate.getMinutes() === updatedDate.getMinutes()
        );
    }

    navigateToUserProfile(userId: string): void {
        void this.router.navigate([`profile/${userId}`]);
    }
}
