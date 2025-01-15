import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { KeycloakService } from 'src/app/service/keycloak.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public routes = routes;
  email = "" ;
  user: any;
  isOver = false;
  data = {
    code: "",
    password: "",
    password_2: "",
    email: ""
  }
  constructor(public router: Router,  private kc: KeycloakService,  private aUI:  AlertService,){ }
  resetPassword(e?: any) {
    if(!this.email) return ;
    this.kc.resetPass(this.email, e).then((r) => {
       this.user = r;
       console.log(r);
    }).catch((e) => {
      console.log(e);
      if(e.status == 401)
      this.aUI.show({ active : true, message:"Email ou mot de passe invalide" , type: "danger", pos: 'top-right' });
      else
      this.aUI.show({ active : true, message:"Erreur serveur" , type: "danger", pos: 'top-right' });
    });
  }
  resetNowPassword(e: any) {
    if(!this.email) return ;
    this.data.email = this.email;
    this.kc.resetNowPass(this.data,e).then((r) => {
       console.log(r);
       if(!r.error) {
        this.isOver = true;
        this.aUI.show({ active : true, message:r.message , type: "success", pos: 'top-right' });
       } else {
        this.aUI.show({ active : true, message:r.message , type: "danger", pos: 'top-right' });
       }
    }).catch((e) => {
      console.log(e);
      if(e.status == 401)
      this.aUI.show({ active : true, message:"Email ou mot de passe invalide" , type: "danger", pos: 'top-right' });
      else
      this.aUI.show({ active : true, message:"Erreur serveur" , type: "danger", pos: 'top-right' });
    });
  }
}
