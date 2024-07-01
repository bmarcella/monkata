import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_model/User';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { envQNote } from 'src/environments/environment.prod';
import { BaseApp } from '../BaseApp';
import { Bulletin } from '../models/Bulletin';
import { Etab } from '../models/Etab';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseApp  implements OnInit {
  CUSER: any;
 public user: User;
 public bulletin: Bulletin;
 public regForm: UntypedFormGroup;
  submitted: boolean;

    public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private formBuilder: UntypedFormBuilder,
    private auth: AuthenticationService,
    private formBuilder2: UntypedFormBuilder) {
   super();
   this.CUSER = this.auth.currentUserValueX;
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    }

   initForm(){

    // tslint:disable-next-line:prefer-const
     this.regForm = this.formBuilder2.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      etab_name: ['', Validators.required],
      password: ['', Validators.required]
    });

 }


  get r() {
    return this.regForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }




  onSubmitReg() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }
    const email =    this.r.username.value;
    const password = this.r.password.value;
    const fullName = this.r.fullname.value;
    const phone =    this.r.phone.value;
    const etab_name  =    this.r.etab_name.value;
    const data: FormData = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('fullName', fullName);
    data.append('etab_name', etab_name);
    data.append('phone', phone);
    console.log(data);
    this.app.setData(`${envQNote.endpoint}BO/@App/addUser`, data)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          if (!data.crash) {
            if (!data.body.data.ERROR) {
              this.setAlert('alert-info alert-login', 'Succès', 10);
              this.CUSER = data.body.data.DATA;
              this.auth.setUserDataX(data.body.data.DATA);
              this.initForm();
              this.closeAlert();
              this.router.navigate(['app/tools']);
            } else {
              this.setAlert('alert-danger alert-login', data.body.data.MESSAGE, 10);
            }
          }
        },
        error => {
           this.setAlert('alert-danger alert-login', error, 10);
        }
      );
  }


}
