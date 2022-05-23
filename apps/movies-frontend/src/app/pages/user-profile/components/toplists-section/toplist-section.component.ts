import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SEPToplist, SEP_USER_ACTIONS } from '../../../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../../../interfaces/local-api-endpoints';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CreateToplistModalComponent } from '../create-toplist-modal/create-toplist-modal.component';

@Component({
    selector: 'app-toplists-section',
    templateUrl: './toplist-section.component.html',
    styleUrls: ['./toplist-section.component.scss'],
})
export class TopListSectionComponent implements OnDestroy {
    @Input()
    toplists: SEPToplist[];

    @Input()
    isProfileOwner: boolean;

    @Output()
    onRemove = new EventEmitter<string>();

    subscriptions: Subscription[] = [];

    constructor(private readonly dialogService: DialogService, private readonly httpClient: HttpClient) {}

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    openCreateModal() {
        const ref = this.dialogService.open(CreateToplistModalComponent, {
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe((data) => {
                if (data) {
                    this.getTopListById(data);
                }
            }),
        );
    }

    onRemoveToplist(id: string) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe((data: SEP_USER_ACTIONS) => {
                if (data === SEP_USER_ACTIONS.confirm) {
                    const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}/${id}`;
                    this.subscriptions.push(
                        this.httpClient.delete<boolean>(url).subscribe((response) => {
                            if (response) {
                                this.toplists = this.toplists.filter((element) => {
                                    return element.id !== id;
                                });
                                this.onRemove.emit(id);
                            }
                        }),
                    );
                }
            }),
        );
    }

    private getTopListById(id: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}/${id}`;
        this.subscriptions.push(
            this.httpClient.get<SEPToplist>(url).subscribe((response) => {
                if (response) {
                    this.toplists.push(response);
                    return;
                }
                //error message;
            }),
        );
    }
}
