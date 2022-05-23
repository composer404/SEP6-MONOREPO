import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
        });
    }

    public async onLogin() {
        const login = this.loginForm.get(`login`).value;
        const password = this.loginForm.get(`password`).value;

        const token = await this.authService.login(login, password);

        if (token) {
            const profile = await this.authService.getProfile();
            this.router.navigateByUrl(`/profile/${profile.id}`);
            this.addSuccess();
            return;
        }
        // this.showError();
    }

    public clear(): void {
        this.messageService.clear();
    }

    onClickSignUp(): void {
        this.router.navigateByUrl('/signup');
    }

    private addSuccess(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You have been logged in properly',
        });
    }

    private addError(): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'You have not been logged in properly',
        });
    }
}
