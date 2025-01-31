import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../_Services/Authentification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    // console.log(currentUser)
    if (currentUser ) {
     if(currentUser.role.name!="STUDENT" && currentUser.role.name!="PARENT" ) {
       return true;
      } else {
       this.router.navigate(['/app/home']);
       return true;
     }
    }
   // tslint:disable-next-line: align
  //  if (currentUser) {
      //  return true;
    // }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/app/login'] , { queryParams: { returnUrl: state.url } });
    return false;
  }
}
