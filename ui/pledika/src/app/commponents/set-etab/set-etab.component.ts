import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment, getUrl, token } from 'src/environments/environment.prod';
import { setting } from '../../../environments/environment.prod';

@Component({
  selector: 'app-set-etab',
  templateUrl: './set-etab.component.html',
  styleUrls: ['./set-etab.component.css']
})
export class SetEtabComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response = { state: '', message: '', active: false };
  response1 = { state: '', message: '', active: false };
  etab: any;
  name;
  ename;
  login = false;
  page = 0;
  start = false;
  na = 5;
  attemp = this.na;
  prod = environment.production;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private authenticationService: AuthenticationService
  ) {
   if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/app/home']);
    }

   if (environment.production) {
       this.name = localStorage.getItem('url_backend');
     }
    sessionStorage.setItem('TYPE_APP',"PLK");
  }
  // PASS = Loppe@2017;
  ngOnInit() {

    this.ename = this.route.snapshot.params.etab;
    if (this.ename !== undefined && this.ename !== 0 && this.ename !== '0') {
         this.name = this.ename;
         this.onSubmitCode();
     } else {

    }
  }

ngAfterViewInit() {
  this.clean();
}


 setBG() {
     return  `url(assets/bg/bg_10.png)`;
 }

 onSubmitCode() {
    this.submitted = true;
    if (this.name != null && this.name !== '') {
    const name = this.name;
    this.loading = true;
    this.start = true;
    this.app.getData(`${getUrl(name)}backdoor/checkDomain/${token}`)
      .pipe(first())
      .subscribe(
        data => {
        this.loading = false;
        this.submitted = false;
        if (!data.crash) {
          this.setUrl(name);
         } else {
          if(this.attemp==0){
          this.start = false;
          this.error = data.message;
          this.loading = false;
          this.response1.active = true;
          this.response1.state = 'danger';
          this.response1.message = this.error;
           } else {
             this.attemp--;
             this.onSubmitCode();
          }
        }
        },
        error => {
          if(this.attemp==0){
          this.start = false;
          this.error = 'Etablissement non trouvé';
          this.loading = false;
          this.submitted = false;
          this.response1.active = true;
          this.response1.state = 'danger';
          this.response1.message = this.error + '-\n' + error;
          this.loading = false;
          } else {
              this.attemp--;
              this.onSubmitCode();
          }
        }
      );
    } else {
          this.loading = false;
          this.response1.active = true;
          this.response1.state = 'danger';
          this.response1.message = 'Vous devez entrer le code votre etablissement';
     }
  }


  async setUrl(name) {
    localStorage.setItem('url_backend', '');
    if (name !== undefined && name !== '') {
    await  localStorage.setItem('url_backend', name);
    name = localStorage.getItem('url_backend');
    this.getEtabInfo(name);
   }
 }

async clean() {
  this.etab = null;
  this.login = false;
  this.start = false;
  this.attemp = this.na;
  await  localStorage.setItem('etab', null);
  await  localStorage.setItem('url_backend', '');
}

  getEtabInfo(name) {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
          this.etab = data._embedded.etablissements[0];
          localStorage.setItem('etab', JSON.stringify(this.etab));
          this.login = true;
          }
        },
        error => {
          this.error = 'Etablissement non trouvé';
          this.loading = false;
          this.submitted = false;
          this.response1.active = true;
          this.response1.state = 'danger';
          this.response1.message = this.error;
          this.loading = false;
        }
      );
  }

}
