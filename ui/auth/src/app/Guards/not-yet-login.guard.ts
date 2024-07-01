import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../service/keycloak.service';
export const notYetLoginGuard: CanActivateFn = (route, state) => {
  return !inject(KeycloakService).isLoggedIn()
  ? true
  : inject(Router).createUrlTree(['/home']);
};
