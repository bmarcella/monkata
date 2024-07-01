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
import { EventData } from '../shared/models/event.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private storageService: StorageService,
    private authService: KeycloakService,
    private eventBusService: EventBusService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isExp = this.authService.isTokenExpired();

    if (isExp) {
      console.log("Token Time expired");
    }
    const token = this.storageService.get("_token") || false;
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
    //  this.isRefreshing = false;
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.authService.isLoggedIn()) {
        console.log("Get NEW token");
        return this.getNewToken(request, next);
      } else {
        console.log("NOT LOGIN");
      }
    } else {
      this.isRefreshing = false;
      console.log("IS REFRESHING");
    }
    return next.handle(request);
  }


  private getNewToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((data: any) => {
        this.isRefreshing = false;
        console.log("REFRESH", data);
        this.authService.refreshNewToken(data);
        request = this.setToken(request, data.access_token);
        return next.handle(request);
      }),
      catchError((error) => {
        this.isRefreshing = false;
        if (error.status == '403') {
          console.log("SUPPOSED TO LOGOUT");
          this.eventBusService.emit(new EventData('logout', null));
        } else {
          console.log("OTHER ERROR");
        }
        return throwError(() => error);
      })
    );
  }



}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
