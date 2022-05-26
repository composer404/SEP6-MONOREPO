import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { SEP_ERROR_CODES } from '../../interfaces/interfaces';
import { InfoService } from '../../services/info.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    unauthorized: boolean;

    constructor(private router: Router, private authService: AuthService, private infoService: InfoService) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
        });
    }

    async onLogin() {
        const login = this.loginForm.get(`login`).value;
        const password = this.loginForm.get(`password`).value;
        const response = await this.authService.login(login, password);

        if (response === SEP_ERROR_CODES.unauthorized) {
            this.unauthorized = true;
            return;
        }

        if (response === SEP_ERROR_CODES.internal) {
            this.infoService.error(`Cannot connect to the server. Try again later.`);
            return;
        }

        const profile = await this.authService.getProfile();
        this.router.navigateByUrl(`/profile/${profile.id}`);
    }

    onClickSignUp(): void {
        this.router.navigate(['signup']);
    }

    hideErrorMessage() {
        if (this.unauthorized) {
            this.unauthorized = false;
        }
    }
}
