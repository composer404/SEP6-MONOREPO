import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService) {}

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
            this.router.navigateByUrl(`/board/${profile.id}`);
        }
    }

    onClickSignUp(): void {
        this.router.navigateByUrl('/signup');
    }
}
