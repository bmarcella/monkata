import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { KeycloakService } from '../service/keycloak.service';


export const EntGuard: CanActivateFn = (route, state) => {
  if( inject(KeycloakService).isLoggedInGuard() )
      return true
    return checker(inject(KeycloakService), inject(CrudService));
 };


 const checker = (auth, crud) : boolean => {
   const user = auth.profil();
   if (!user) {
     const url =  "/jobs/add-ent";
     crud.loginWithReturn(url,undefined);
   }
   return false;
 }
