/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../service/keycloak.service';

export const anonimousGuard: CanActivateFn = (route, state) : Observable<boolean | UrlTree>
| Promise<boolean | UrlTree>
| boolean
| UrlTree=> {
  return !inject(KeycloakService).isLoggedIn()
  ? true
  : inject(Router).createUrlTree(['/home']);
};
