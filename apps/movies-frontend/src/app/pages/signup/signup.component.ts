import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService],
})
export class SignupComponent implements OnInit {
    public signupForm: FormGroup;
    avatar: any;
    msg = '';

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig,
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.signupForm = new FormGroup({
            login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            email: new FormControl(``, [Validators.required]),
            password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            firstName: new FormControl(``),
            lastName: new FormControl(``),
            avatar: new FormControl(``),
        });
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

    public async onSignUp() {
        const response = await this.authService.signup({
            login: this.signupForm.get('login').value,
            email: this.signupForm.get('email').value,
            password: this.signupForm.get('password').value,
            firstName: this.signupForm.get('firstName').value,
            lastName: this.signupForm.get('lastName').value,
            avatar: this.avatar,
        });
        console.log(`reponse`, response);
        if (response?.id) {
            void this.router.navigateByUrl(`/login`);
            this.showSuccess();
            return;
        }
        this.showError();
    }

    public clear() {
        this.messageService.clear();
    }

    showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You have been signed up properly',
        });
    }

    showError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'You have not been signed up properly',
        });
    }
}
