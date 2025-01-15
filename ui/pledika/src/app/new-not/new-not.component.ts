import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../_Services/app.service';
import { AuthenticationService } from '../_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-not',
  templateUrl: './new-not.component.html',
  styleUrls: ['./new-not.component.css']
})
export class NewNotComponent implements OnInit {
  user: any;
  ID: any;
  NOT: any;
  response = { state: '', message: '', active: false };
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private auth: AuthenticationService
  ) {
    this.user = this.auth.currentUserValue;
    this.ID = this.route.snapshot.params.id;
    this.readNot();
    this.getNot();
  }

  ngOnInit() {

  }
  getNot() {
    this.app
      .getData(`${environment.apiUrl}notifications/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
         this.NOT = data;
        },
        (error) => { }
      );
  }

  readNot() {
    this.app
      .getData(`${environment.apiUrl}readNot/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        (error) => { }
      );
  }
  takeNot() {
    this.app
      .getData(`${environment.apiUrl}takeNot/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {

          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.NOT = data.data;
            this.response.state = 'success';
            this.response.message = data.message;
            this.readNot();
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;

       }
      );
  }

}
