import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  success = '';
  response = {state: '', message: '', active: false};
  etab: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/app/home']);
    }
  }



  getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
        },
        error => {
        }
      );
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getEtabInfo();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.regForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.response.active = false;
    // stop here if form is invalid
    if (this.regForm.invalid) {
        return;
    }

    this.loading = true;
    const creds = { fname: this.f.fname.value, lname: this.f.lname.value, username: this.f.username.value, password: this.f.password.value};
    this.authenticationService
      .register(creds)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
           this.response.state = 'success';
           this.response.message = data.message;
            } else {
              this.response.state = 'danger';
              this.response.message = data.message;
           }
        },
        error => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );
  }

  setBG() {
    return `url(assets/bg/${this.etab.background})`;
  }
}
