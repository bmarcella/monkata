import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { KeycloakService } from 'src/app/service/keycloak.service';

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";
  user: any ;
  role: any;
  constructor(public router: Router, private kc : KeycloakService) {
    if (JSON.parse(localStorage.getItem("_profil"))) {
      this.user = JSON.parse(localStorage.getItem("_profil"));
     } 

     if (JSON.parse(localStorage.getItem("_role"))) {
      this.role = JSON.parse(localStorage.getItem("_role"));
     } 
  }

  ngOnInit() {}

  logoutFunc() {
    this.kc.forceLogout();
    this.router.navigateByUrl('auth/login');
  }
}
