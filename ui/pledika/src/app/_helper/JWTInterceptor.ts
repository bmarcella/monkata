import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_Services/Authentification.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;
    const tp = sessionStorage.getItem('TYPE_APP');

    if (currentUser && currentUser.token) {
        const token = `Bearer ${currentUser.token}`;
        const headers = new HttpHeaders({
          Accept: 'application/json',
          Authorization: token
        });
        request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
