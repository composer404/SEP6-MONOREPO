import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api-endpoints';
import { environment } from 'src/environments/environment';
import { SEPUser } from '../../../../interfaces/interfaces';

@Component({
    selector: 'app-update-user-modal',
    templateUrl: './update-user-modal.component.html',
    styleUrls: ['./update-user-modal.component.scss'],
})
export class UpdateUserModalComponent implements OnInit {
    updateUserForm: FormGroup;
    updatePasswordForm: FormGroup;

    updateProfileState: boolean = true;
    avatar: any;
    msg = '';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly messageService: MessageService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        this.initUpdatePasswordForm();
        this.initUpdateProfileForm();

        console.log(`data`, this.config.data);
        const user: SEPUser = this.config.data;
        this.updateUserForm.patchValue({
            login: user.login,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        this.avatar = user.avatar;
    }

    selectFile(event: any) {
        if (!event.target.files[0] || event.target.files[0].length == 0) {
            this.msg = 'You must select an image';
            return;
        }

        const mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.msg = 'Only images are supported';
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
            this.msg = '';
            this.avatar = reader.result;
            console.log(this.avatar);
        };
    }

    close(): void {
        this.ref.close(null);
    }

    async onSave() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.users}`;
        const requestBody = {
            firstName: this.updateUserForm.get(`firstName`).value,
            lastName: this.updateUserForm.get(`lastName`).value,
            avatar: this.avatar,
        };
        const response = await firstValueFrom(this.httpClient.put<boolean>(url, requestBody));

        if (!response) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Profile update failed. Try again later',
            });
            this.ref.close(false);
            return;
        }
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile has been succesfully updated',
        });
        this.ref.close(this.config.data.id);
    }

    async onSavePassword() {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.usersPassword}`;
        const requestBody = {
            password: this.updatePasswordForm.get(`password`).value,
        };
        const response = await firstValueFrom(this.httpClient.put<boolean>(url, requestBody));

        if (!response) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Password update failed. Try again later',
            });
            this.ref.close(false);
            return;
        }

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password has been succesfully updated',
        });
        this.ref.close(this.config.data.id);
    }

    private initUpdateProfileForm() {
        this.updateUserForm = new FormGroup({
            login: new FormControl(``),
            email: new FormControl(``),
            firstName: new FormControl(``),
            lastName: new FormControl(``),
            avatar: new FormControl(``),
        });
    }

    private initUpdatePasswordForm() {
        this.updatePasswordForm = new FormGroup(
            {
                password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
                confirmPassword: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            },
            (controls: any): any => {
                if (controls.get(`password`).value !== controls.get(`confirmPassword`).value) {
                    return { mismatch: true };
                }
            },
        );
    }
}
