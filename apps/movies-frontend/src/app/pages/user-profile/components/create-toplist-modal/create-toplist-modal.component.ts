import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api-endpoints';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-create-toplist-modal',
    templateUrl: './create-toplist-modal.component.html',
    styleUrls: ['./create-toplist-modal.component.scss'],
})
export class CreateToplistModalComponent implements OnInit {
    public topListForm: FormGroup;

    constructor(
        private readonly httpClient: HttpClient,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        this.topListForm = new FormGroup({
            name: new FormControl(``, [Validators.required, Validators.minLength(1)]),
            description: new FormControl(``, [Validators.required, Validators.minLength(10)]),
        });
    }

    createToplist(): void {
        this.httpClient
            .post<{ id: string }>(`${environment.localApiUrl}${LOCAL_API_SERVICES.topList}`, {
                name: this.topListForm.get('name').value,
                description: this.topListForm.get('description').value,
            })
            .subscribe((response) => {
                if (!response?.id) {
                    //error
                    return;
                }

                this.ref.close(response.id);
            });
    }

    close(): void {
        this.ref.close(null);
    }
}
