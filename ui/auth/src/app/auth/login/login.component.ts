import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { getRURL } from 'src/environments/environment.prod';

import { KeycloakService } from '../../service/keycloak.service';

type Login = { username: string, password: string, token?: string }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public routes = routes;
  public toggleData = false;
  name: any;
  creds: Login = {
    username: "bmarcella91@gmail.com",
    password: "lolo91"
  }
  ct: any;
  constructor(public router: Router, private kc: KeycloakService, private aUI:  AlertService,) {
    this.ct = this.kc.getCToken();
    if (this.ct && this.ct.cross_token.appName)
    this.name = this.ct.cross_token.appName;
  }

  path() {
    this.router.navigate([routes.dashboard]);
  }

  togglePassword() {
    this.toggleData = !this.toggleData;
  }



  login(creds: Login) {
    this.kc.login(creds).then((r) => {
      console.log(r);
      if(!r.cross_token) {
        this.router.navigate(['/']);
      } else{
        const ct = this.kc.getCToken();
        const ck = ct.cross_token;
        const URL = getRURL(ck, r.cross_token);
        window.location.href = URL;
      }
    }).catch((e) => {
      if(e.status == 401)
      this.aUI.show({ active : true, message:"Email ou mot se passe invalide" , type: "danger", pos: 'top-right' });
      else
      this.aUI.show({ active : true, message:"Erreur serveur" , type: "danger", pos: 'top-right' });
    });
  }
}
