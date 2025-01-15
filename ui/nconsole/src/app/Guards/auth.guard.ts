import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { KeycloakService } from '../service/keycloak.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(KeycloakService).isLoggedInGuard()
  ? true
  : inject(Router).createUrlTree(['auth/login']);
};
