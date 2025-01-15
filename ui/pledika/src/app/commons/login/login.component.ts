import { getUrl, token } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { first } from 'rxjs/internal/operators/first';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  etabForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response = { state: '', message: '', active: false };
  response1 = { state: '', message: '', active: false };
  etab: any;
  name;
  login = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private ref: ChangeDetectorRef,
 //   public zone: NgZone
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/app/home']);
    }

  }
  // PASS = Loppe@2017;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'app/home';
    this.setHost();
  }

  async setHost(){

    if (environment.production) {
      this.name = await localStorage.getItem('url_backend');
       } else {
      this.name = await environment.host;
    }
    if ( (this.name == null || this.name === '' || this.name === undefined) ) {
          this.router.navigate(['/app/setEtab/0']);
          } else {
          this.getEtabInfo();
      }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get e() {
    return this.etabForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const name = this.setUserName(this.f.username.value);
    this.authenticationService
      .login(name, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
            this.loading = false;
            this.response.active = true;
            if (!data.crash) {
             if (this.etab.over_config) {
              this.router.navigate([this.returnUrl]);
               } else {
               this.router.navigate(['app/config']);
              }
           } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

async getEtabInfo() {
 this.etab  = await JSON.parse(localStorage.getItem('etab'));
}
 setBG() {
     return (this.etab) ? `url(assets/bg/${this.etab.background})` : `url(assets/bg/bg_10.png)` ;
 }





  setUserName(name) {
  if (this.isEmail(name) ) {
    return name;
   } else {
       return name + '@pledika.com';
   }
  }

isEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
}

}
