import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: 'app-fpass',
  templateUrl: './fpass.component.html',
  styleUrls: ['./fpass.component.css']
})
export class FpassComponent implements OnInit {
  loading;
  response = { state: '', message: '', active: false };
  etab: any;
  submitted = false;
  returnUrl: string;
  error = '';
  email:any;
  constructor(
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

  ngOnInit() {
    this.getEtabInfo();
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

  fpass(email) {
    this.loading = true;
    this.app.getData(`${environment.apiUrl}fpass/${email}`)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
            this.email="";
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
  setBG() {
    return `url(assets/bg/${this.etab.background})`;
  }
}
