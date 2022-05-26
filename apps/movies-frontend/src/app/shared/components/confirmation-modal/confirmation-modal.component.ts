import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api-endpoints';
import { environment } from 'src/environments/environment';
import { SEP_USER_ACTIONS } from '../../../interfaces/interfaces';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
    actions = SEP_USER_ACTIONS;

    constructor(public ref: DynamicDialogRef) {}

    close(userAction: SEP_USER_ACTIONS): void {
        this.ref.close(userAction);
    }
}
