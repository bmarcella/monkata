/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Subject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { EventBusService } from './event-bus.service';
import { StorageService } from './storage.service';
import { KeycloakService } from './keycloak.service';
import { CrudService } from './crud.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService,
    private authService: KeycloakService, private crud : CrudService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isExp = this.authService.isTokenExpired();
    const token = this.storageService.get("_token") || false;
    console.log(isExp , this.authService.isLoggedIn());
    if (isExp && this.authService.isLoggedIn()) {
      console.log("TOKEN EXP AND LOGIN");
       const isExpR = !this.authService.isRefreshTokenExpired();
       if(isExpR) {
        console.log("REFRESH TOKEN NOT EXP");
         this.preGetNewToken().then((_tk) => {

         }).catch((_error)=>{

         });
       } else {
          console.log("REFRESH TOKEN EXP FORCE LOGOUT");
          this.authService.forceLogout();
          this.crud.login();
       }
    }

      req = this.setToken(req, token);
      return next.handle(req).pipe(
        catchError((error) => {
          return this.catchError(req, next, error);
      }));

  }

  setToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
    if (token) {
      const auth = `Bearer ${token}`;
      const headers = new HttpHeaders({
        // Accept: 'application/json',
        Authorization: auth
      });
      req = req.clone({ headers });
    }
    return req;
  }

  private catchError(req: HttpRequest<any>, next: HttpHandler, error: any) {
    if (error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
      console.log("UNAUTH");
      return this.handle401Error(req, next);
    }
    return throwError(() => error);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (this.authService.isLoggedIn()) {
          console.log("Get NEW token");
          return this.getNewToken(request, next);
        }
    return next.handle(request);
  }


  private getNewToken(request: HttpRequest<any>, next: HttpHandler) {

    return this.authService.refreshToken().pipe(
      switchMap((data: any) => {
        console.log("REFRESH TOKEN NOW ", data);
        this.authService.refreshNewToken(data);
        request = this.setToken(request, data.access_token);
        return next.handle(request);
      }),
      catchError((error) => {
        if (error.status == '403') {
            console.log("SUPPOSED TO LOGOUT");
            this.authService.forceLogout();
        } else {
          console.log("OTHER ERROR");
        }
        return throwError(() => error);
      })
    );
  }

  private preGetNewToken() {
    return new Promise((r, e) => {
    this.authService.refreshToken().pipe().subscribe({
      next: (data: any) => {
        console.log("REFRESH TOKEN NOW ", data);
        this.authService.refreshNewToken(data);
         r(data.access_token);
      },
      error: (error) => {
        if (error.status == '403') {
          console.log("SUPPOSED TO LOGOUT");
          this.authService.forceLogout();
      } else {
        console.log("OTHER ERROR");
      }
      e(error);
      }
    });

  });

  }



}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
