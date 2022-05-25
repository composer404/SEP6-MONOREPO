import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { firstValueFrom, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SEPToplist, SEP_USER_ACTIONS } from '../../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../../interfaces/local-api-endpoints';
import { InfoService } from '../../../services/info.service';

@Component({
    selector: 'app-add-to-toplist-modal',
    templateUrl: './add-to-toplist-modal.component.html',
    styleUrls: ['./add-to-toplist-modal.component.scss'],
})
export class AddToToplistModalComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    toplists: SEPToplist[];
    movieApiId: number;

    constructor(
        private readonly httpClient: HttpClient,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private infoService: InfoService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.movieApiId = this.config.data.movieApiId;
        this.loadUserToplists();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    close(): void {
        this.ref.close(SEP_USER_ACTIONS.confirm);
    }

    loadUserToplists() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}`;
        this.httpClient.get<SEPToplist[]>(url).subscribe((response) => {
            if (!response) {
                this.infoService.error('Cannot load user toplist. Try again later');
                return;
            }
            console.log(response);
            this.toplists = response;
        });
    }

    async addToToplist(toplistId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}/${toplistId}/movie/add`;
        const reponse = await firstValueFrom(
            this.httpClient.put<boolean>(url, {
                apiId: this.config.data.movieApiId,
                title: this.config.data.title,
                posterPath: this.config.data.posterPath,
            }),
        );
        console.log(reponse);
        if (!reponse) {
            this.infoService.error('Cannot add movie to the toplist. Try again later');
            return;
        }

        const selectedToplist = this.getToplistById(toplistId);
        selectedToplist.movieApiIds.push(this.movieApiId);
        this.infoService.success(`Movie has been sucessfully added to the toplist`);
    }

    async removeFromToplist(toplistId: string): Promise<void> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.topList}/${toplistId}/movie/${this.movieApiId}/remove`;
        const reponse = await firstValueFrom(this.httpClient.put<boolean>(url, {}));

        if (!reponse) {
            this.infoService.error('Cannot remove movie from the toplist. Try again later');
            return;
        }
        const selectedToplist = this.getToplistById(toplistId);
        selectedToplist.movieApiIds = selectedToplist.movieApiIds.filter((element) => {
            return element !== this.movieApiId;
        });
    }

    movieInToplist(toplistId: string): boolean {
        const selectedToplist = this.getToplistById(toplistId);
        return selectedToplist.movieApiIds.includes(this.movieApiId);
    }

    getToplistById(toplistId: string): SEPToplist {
        const [selectedToplist] = this.toplists.filter((element) => {
            return element.id === toplistId;
        });
        return selectedToplist;
    }
}
