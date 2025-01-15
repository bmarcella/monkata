import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: "app-change-pass",
  templateUrl: "./change-pass.component.html",
  styleUrls: ["./change-pass.component.css"],
})
export class ChangePassComponent implements OnInit {
  loading: any;
  pass = { pass_0: "", pass_1: "", pass_2: "" };
  response = { state: "", message: "", active: false };
  response2 = { state: "", message: "", active: false };
  submitted = false;
  constructor(public nServ: AppService, private auth: AuthenticationService) {}

  ngOnInit() {}

  editPass() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.response.active = false;
    if (this.pass.pass_0 == "") {
      this.loading = false;
      this.response.active = true;
      this.response.state = "danger";
      this.response.message = "Vous devez ajouter l'ancien mot de passe.";
      return;
    }
    if (this.pass.pass_1 !== this.pass.pass_2) {
      this.loading = false;
      this.response.active = true;
      this.response.state = "danger";
      this.response.message = "Nouveau mot de passe non identique.";
      return;
    }
    const $POST = {
      pass_0: `${this.pass.pass_0}`,
      pass_1: `${this.pass.pass_1}`,
    };

    console.log($POST); // return;
    const url = `${environment.apiUrl}changePass`;
    this.nServ
      .setData(url, $POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = "success";
            this.response.message = data.message;
            this.pass = { pass_0: "", pass_1: "", pass_2: "" };
          } else {
            this.response.state = "danger";
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
          this.loading = false;
        }
      );
  }
  pin;
  editPin() {
 if (this.loading) {
   return;
 }
 this.loading = true;
 this.response2.active = false;
 const url = `${environment.apiUrl}changeMyPin/${this.pin}`;
 this.nServ
   .getData(url)
   .pipe(first())
   .subscribe(
     (data) => {
       this.loading = false;
       this.response2.active = true;
       if (!data.crash) {
         this.response2.state = "success";
         this.response2.message = data.message;
         this.pin = '';
       } else {
         this.response2.state = "danger";
         this.response2.message = data.message;
       }
     },
     (error) => {
       this.response2.active = true;
       this.response2.state = "danger";
       this.response2.message = error;
       this.loading = false;
     }
   );

  }
}
