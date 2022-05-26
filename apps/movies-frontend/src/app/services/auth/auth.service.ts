import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SEPApiCreatedObject, SEP_ERROR_CODES, SignUpInput, Token, UserProfile } from '../../interfaces/interfaces';
import { firstValueFrom, iif, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn = false;
    loginSubject = new Subject<boolean>();

    constructor(private httpClient: HttpClient, private readonly router: Router) {}

    public getTokenValue(): string {
        return localStorage.getItem('token') as string;
    }

    public async login(username: string, password: string): Promise<string> {
        const response = await firstValueFrom(
            this.httpClient.post<Token>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authLogin}`, {
                login: username,
                password: password,
            }),
        ).catch((err) => {
            console.log(err, err);
            return err;
        });

        if (response?.statusCode === 401) {
            return SEP_ERROR_CODES.unauthorized;
        }

        if (response?.statusCode) {
            return SEP_ERROR_CODES.internal;
        }

        if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            this.loginSubject.next(true);
        }
        return response.accessToken;
    }

    public async getProfile(): Promise<UserProfile> {
        console.log(`HERE`);
        return firstValueFrom(
            this.httpClient.get<UserProfile>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authProfile}`),
        );
    }

    public async validateUser(): Promise<boolean> {
        console.log(`validate user`);
        const token = this.getTokenValue();

        if (!token) {
            return false;
        }

        const profile = await this.getProfile().catch(() => {
            return false;
        });

        if (!profile) {
            return false;
        }

        return true;
    }

    public async signup(body: SignUpInput): Promise<SEPApiCreatedObject> {
        return firstValueFrom(
            this.httpClient.post<SEPApiCreatedObject>(
                `${environment.localApiUrl}${LOCAL_API_SERVICES.authRegistry}`,
                body,
            ),
        );
    }

    public async isProfileOwner(id: string): Promise<boolean> {
        const profile = await this.getProfile();

        if (profile.id !== id) {
            return false;
        }

        return true;
    }

    public logout(): void {
        this.isLoggedIn = false;
        localStorage.setItem(`token`, ``);
        this.loginSubject.next(false);
        void this.router.navigate([`login`]);
    }
}
