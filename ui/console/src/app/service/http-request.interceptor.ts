/* eslint-disable @typescript-eslint/no-empty-function */
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { CrudService } from './crud.service';
import { KeycloakService } from './keycloak.service';
import { StorageService } from './storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService,
    private authService: KeycloakService, private crud: CrudService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isExp = this.authService.isTokenExpired();

    const token = this.storageService.get("_token") || false;
    const tokenEnt = this.storageService.getJson("entToken") || false;
   
    console.log(isExp, this.authService.isLoggedIn());

    if (isExp && this.authService.isLoggedIn()) {
      console.log("TOKEN EXP AND LOGIN");
      const isExpR = !this.authService.isRefreshTokenExpired();
      if (isExpR) {
        console.log("REFRESH TOKEN NOT EXP");
        this.preGetNewToken().then((_tk) => {

        }).catch((_error) => {

        });
      } else {
        console.log("REFRESH TOKEN EXP FORCE LOGOUT");
        this.authService.forceLogout();
        this.crud.login();
      }
    }
   const tEnt = (tokenEnt && tokenEnt.appEntToken.token) ? tokenEnt.appEntToken.token : false;
   req = this.setToken(req, token, tEnt);
    return next.handle(req).pipe(
      catchError((error) => {
        return this.catchError(req, next, error, tEnt);
      }));

  }

  setToken(req: HttpRequest<any>, token: any, tEnt): HttpRequest<any> {
    if (token) {
      const bearer = `Bearer ${token}`;
      let  headers;
      if(tEnt) {
         headers = new HttpHeaders({
          Authorization: bearer,
          entToken: tEnt
        });
      } else {
         headers = new HttpHeaders({
          Authorization: bearer,
        });
      }
      console.log(headers);
      req = req.clone({ headers });
    }
    return req;
  }




  private catchError(req: HttpRequest<any>, next: HttpHandler, error: any, tEnt) {
    if (error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
      console.log("UNAUTH");
      return this.handle401Error(req, next, tEnt);
    }
    // to work on later
    // if (error instanceof HttpErrorResponse && error.status === 402) {
    //   console.log("UNAUTH");
    //   return this.handle401Error(req, next, tEnt);
    // }
    return throwError(() => error);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, tEnt) {
    if (this.authService.isLoggedIn()) {
      console.log("Get NEW token");
      return this.getNewToken(request, next, tEnt);
    }
    return next.handle(request);
  }


  private getNewToken(request: HttpRequest<any>, next: HttpHandler,tEnt) {

    return this.authService.refreshToken().pipe(
      switchMap((data: any) => {
        console.log("REFRESH TOKEN NOW ", data);
        this.authService.refreshNewToken(data);
        request = this.setToken(request, data.access_token,tEnt);
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
