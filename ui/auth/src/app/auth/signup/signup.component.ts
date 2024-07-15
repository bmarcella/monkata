import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { UserReg } from 'src/app/shared/models/UserReg';

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
    tokenRC: ""
  }
  reset(){
    this.creds  = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      tokenRC: ""
    }
  }
  register(creds: UserReg, e:any) {
    if (this.sign) return;
    this.sign = true;
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      creds.tokenRC = token;
      this.kc.register(creds).then(() => {
        this.reset();
        this.sign = false;
        this.aUI.show({ active : true, message:"Votre a été crée avec success" , type: "success", pos: 'top-right' });
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
