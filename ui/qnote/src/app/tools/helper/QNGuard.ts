import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Injectable({ providedIn: 'root' })
export class QNGuard  {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValueX;
    // console.log(currentUser)
    if (currentUser) {
     if(currentUser.role>=2) {
         return true;
      } else {
       this.router.navigate(['/app/tools']);
       return true;
     }
    }
   // tslint:disable-next-line: align
  //  if (currentUser) {
      //  return true;
    // }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/app/tools'] , { queryParams: { returnUrl: state.url } });
    return false;
  }
}
