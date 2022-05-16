import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private auth: AuthService) {
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let token = this.auth.getTokenValue();
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }

// export const authInterceptorProviders = [
//   {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
// ];
