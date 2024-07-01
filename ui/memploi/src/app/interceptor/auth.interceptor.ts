import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { EventBusService } from '../service/event-bus.service';
import { StorageService } from '../service/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private storageService: StorageService,
    private authService: KeycloakService,
    private eventBusService: EventBusService) { }


  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone();
    console.log(req);
    return next.handle(req);
  }
}
