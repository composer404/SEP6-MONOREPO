import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, UserProfile } from '../../interfaces/interfaces';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn = false;

    constructor(private httpClient: HttpClient) {}

    public getTokenValue(): string {
        return localStorage.getItem('token') as string;
    }

    public async login(username: string, password: string): Promise<string> {
        const response = await firstValueFrom(
            this.httpClient.post<Token>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authLogin}`, {
                login: username,
                password: password,
            }),
        );

        if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
        }
        return response.accessToken;
    }

    public async getProfile(): Promise<UserProfile> {
        return firstValueFrom(
            this.httpClient.get<UserProfile>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authProfile}`),
        );
    }

    public async validateUser(): Promise<boolean> {
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

  public async signup(): Promise<string> {
    const response = await firstValueFrom(
      this.httpClient.post<Token>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authLogin}`, {
        "login": "test",
        "email": "test@test.pl",
        "firstName": "test",
        "lastName": "test",
        "password": "test",
        "avatar": ""
      }),
    );

    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken);
    }
    return response.accessToken;
  }

  public logout(): void {
      this.isLoggedIn = false;
      localStorage.setItem(`token`, ``);
  }
}
