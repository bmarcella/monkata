import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { UserReg } from 'src/app/shared/models/UserReg';

import { getRURL } from 'src/environments/environment.prod';
import { KeycloakService } from '../../service/keycloak.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public routes = routes;
  public toggleData = false;
  name : any;
  recaptchaToken: string | undefined;
  ct : any;
  sign  = false;
  constructor(public router: Router, private kc: KeycloakService,  private aUI:  AlertService,private recaptchaV3Service: ReCaptchaV3Service) {
    this.ct = this.kc.getCToken();
    if (this.ct && this.ct.cross_token.appName)
    this.name = this.ct.cross_token.appName;
   }
  path() {
    this.router.navigate([routes.login]);
  }
  togglePassword() {
    this.toggleData = !this.toggleData;
  }

  creds: UserReg = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    tokenRC: "",
    token: "",
  }
  reset(){
    this.creds  = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      tokenRC: "",
      token: "",
    }
  }
  register(creds: UserReg, e:any) {

    if (this.sign) return;
    this.sign = true;

    if(!creds.firstname || !creds.lastname || !creds.email || !creds.password) {
      this.aUI.show({ active : true, message:"Tous les champs sont obligatoire." , type: "danger", pos: 'top-right' });
      this.sign = false;
      return;
    }

    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      creds.tokenRC = token;
      creds.token = this.ct.cross_token.token;
      this.kc.register(creds).then((r) => {
        this.reset();
        this.sign = false;
        const ct = this.kc.getCToken();
        const ck = ct.cross_token;
        const URL = getRURL(ck, r.cross_token);
        console.log(r, URL);
        window.location.href = URL;
      }).catch((e) => {
          this.sign = false;
          if(e.status==409)
          this.aUI.show({ active : true, message:"Email existe déjà" , type: "danger", pos: 'top-right' });
          else
          this.aUI.show({ active : true, message:"Erreur serveur" , type: "danger", pos: 'top-right' });
        console.log(e);
      });
    },
    (error: string) => {
      this.sign = false;
      console.log(error);
    });
    
  }


}
