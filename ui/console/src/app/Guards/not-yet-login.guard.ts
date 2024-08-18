import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { KeycloakService } from '../service/keycloak.service';

export const notYetLoginGuard: CanActivateFn = (route, state) => {
  return !inject(KeycloakService).isLoggedIn()
  ? true
  : inject(Router).createUrlTree(['admin/home']);
};
