import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { TokenInterceptorService } from '../../helpers/http-interceptor';
import { SEPSharedModule } from '../../shared/components/sep-shared.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SignupComponent } from '../signup/signup.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let nativeElement: HTMLElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                InputTextModule,
                PasswordModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    {
                        path: `signup`,
                        component: SignupComponent,
                    },
                ]),
                HttpClientModule,
                HttpClientTestingModule,
                CommonModule,
                FormsModule,
                SEPSharedModule,
            ],
            providers: [
                DialogService,
                MessageService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptorService,
                    multi: true,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges(false);
        fixture.detectChanges();
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        router = TestBed.inject(Router);

        router.initialNavigation();
    });

    it(`should create`, async () => {
        await expect(component).toBeTruthy();
        expect(component).toBeInstanceOf(LoginComponent);
        await expect(nativeElement).toBeTruthy();
        expect(nativeElement).toBeInstanceOf(HTMLElement);
    });

    it('Login and password to short', () => {
        expect(component.loginForm.invalid).withContext(`Button disabled at the begginig`).toBe(true);

        component.onLogin();

        expect(component.loginForm.invalid).withContext(`After login`);

        component.loginForm.patchValue({
            login: `123`,
            password: `123`,
        });

        expect(component.loginForm.invalid).withContext(`After inserting to short values`).toBe(true);
    });

    it('Login and password valid', () => {
        component.loginForm.patchValue({
            login: `12313`,
            password: `123123`,
        });

        expect(component.loginForm.valid).withContext(`After inserting valid values`).toBe(true);
    });

    it('Navigate to signup page', () => {
        const routerstub: Router = TestBed.get(Router);
        spyOn(routerstub, 'navigate');
        component.onClickSignUp();
    });
});
