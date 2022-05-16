import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Token} from "../../../models/token.model";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getTokenValue(): string | null {
    return localStorage.getItem("token");
  }

  public async login(username: string, password: string): Promise<void> {
    const response = await firstValueFrom(this.http.post<Token>(`http://localhost:3000/api/auth/login`, {login: username,
      password: password}));
    if(response.accessToken) {
      localStorage.setItem("token", response.accessToken);
    }
  }

  // public register(email: string, password: string, langKey: string): Promise<Token> {
    // return this.http.post<Token>(`http://localhost:3000/api/auth/registry`, {
    //   "email": email,
    //   "login": email,
    //   "password": password,
    //   "retype": password,
    //   "langKey": langKey
    // })
    //   .pipe(map(token => {
    //     localStorage.setItem('token', JSON.stringify(token));
    //     this.tokenSubject.next(token);
    //     return token;
    //   }));
  // }

   // public logout() {
   //   localStorage.removeItem('token');
   //   this.tokenSubject.next(null);
  // }
}

