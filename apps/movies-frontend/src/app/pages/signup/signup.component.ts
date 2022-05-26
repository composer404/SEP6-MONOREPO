import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { API_ERROR_CODES } from '../../interfaces/interfaces';
import { InfoService } from '../../services/info.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    items: MenuItem[];
    activeIndex: number = 0;

    firstStep: boolean = true;
    secondStep: boolean;
    thirdStep: boolean;

    avatar: any;

    constructor(private router: Router, private authService: AuthService, private infoService: InfoService) {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Login',
                command: () => {
                    this.activeIndex = 0;
                    this.firstStep = true;

                    this.thirdStep = false;
                    this.secondStep = false;
                },
            },
            {
                label: 'Personal',
                command: () => {
                    this.activeIndex = 1;
                    this.secondStep = true;

                    this.thirdStep = false;
                    this.firstStep = false;
                },
            },
            {
                label: 'Avatar',
                command: () => {
                    this.activeIndex = 2;
                    this.thirdStep = true;

                    this.firstStep = false;
                    this.secondStep = false;
                },
            },
        ];

        this.signupForm = new FormGroup({
            login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            email: new FormControl(``, [Validators.required]),
            password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            firstName: new FormControl(``),
            lastName: new FormControl(``),
        });
    }

    selectFile(event: any) {
        console.log(`event`, event);
        const mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
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

        if ((response as any)?.code === API_ERROR_CODES.notUniqueLogin) {
            console.log(`HERER`);
            this.infoService.error(`User with provided login already exists!`);
            return;
        }

        if ((response as any)?.code === API_ERROR_CODES.notUniqueEmail) {
            console.log(`HERER`);
            this.infoService.error(`User with provided email already exists!`);
            return;
        }

        if (response?.id) {
            this.infoService.success(`Account has been successfully created!`);
            void this.router.navigateByUrl(`/login`);
            return;
        }
        this.infoService.error(`Cannot connect to the server. Try again later.`);
    }
}
