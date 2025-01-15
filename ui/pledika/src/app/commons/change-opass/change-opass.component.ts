import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-opass',
  templateUrl: './change-opass.component.html',
  styleUrls: ['./change-opass.component.css']
})
export class ChangeOPassComponent implements OnInit {

  loading: any;
  pass =     {  pass_1: '', pass_2: '' };
  response = { state: '', message: '', active: false };
  submitted = false;
  ID: any;
  constructor(private router: Router, private route: ActivatedRoute, public nServ: AppService, private auth: AuthenticationService, ) { }
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
  }
  editPass() {
    if (this.loading) { return; }
    this.loading = true;
    this.response.active = false;

    if (this.pass.pass_1 !== this.pass.pass_2) {
      this.loading = false;
      this.response.active = true;
      this.response.state = 'danger';
      this.response.message = 'Nouveau mot de passe non identique.'
      return;
    }
    const $POST = {
      pass_1: `${this.pass.pass_1}`,
    };

    console.log($POST); // return;
    const url = `${environment.apiUrl}changePass/${this.ID}`;
    this.nServ.setData(url, $POST).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
            this.pass = { pass_1: '', pass_2: ''};
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

}
