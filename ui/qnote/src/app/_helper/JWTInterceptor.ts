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
import { envQNote } from 'src/environments/environment.prod';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const nuser = this.authenticationService.currentUserValueX;
      if (nuser && nuser.token_user) {
        const token = `Bearer ${nuser.token_user}`;
        let headers = new HttpHeaders({
          Userkey: token,
          Apikey: envQNote.API_KEY,
          Accept: 'application/json'
        });
        request = request.clone({ headers });
       } else {
          let  headers = new HttpHeaders({
              Apikey: envQNote.API_KEY
            });
          request = request.clone({ headers });
      }
    return next.handle(request);
  }
}
