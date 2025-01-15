import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-af-rap',
  templateUrl: './af-rap.component.html',
  styleUrls: ['./af-rap.component.css']
})
export class AfRapComponent implements OnInit {
  users = [];
  cuser;
  index = 0;
  response = { state: '', message: '', active: false };
  promo; promos = [];

  ID: any;
  af: any;
  OP: any;
  option;
  loading: any;
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }
  change() {
    this.OP = [];
    this.getOP();
  }
  changeRange(e) {
     this.index = e.target.value;
     this.arrange();
  }
  ngOnInit() {
    this.getUser();
    this.getAF();
  }
  getUser() {
    this.app.getData(
      `${environment.apiUrl}getFreeStudent`
    )
      .pipe(first())
      .subscribe(
        (data) => {
          this.setupUser(data.data);
        },
        (error) => { }
      );
  }

  setupUser(array) {
   this.users = array;
   if (this.users.length === 0) {
      this.router.navigate(['/app/management']);
    }
   this.arrange();
  }

  next() {
    this.index++;
    this.arrange();
  }
  arrange() {
    this.cuser = undefined;
    this.cuser = this.users[this.index];
    console.log(this.cuser);
    window.scroll(0, 0);
  }
  prev() {
    --this.index;
    this.arrange();
  }

  getOP() {
    this.app.getData(
      `${environment.apiUrl}getOptionPaiement?code=${this.promo.code_cycle}`
    )
      .pipe(first())
      .subscribe(
        (data) => {
          this.OP = data.data;
        },
        (error) => { }
      );
  }

  getAF() {
    const url = `${environment.apiUrl}getAf`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.af = data.data;
          if (this.af != null) {
            this.promos = this.af.promotion;
          }
        },
        (error) => { }
      );
  }

  addSTP() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    const udata = {
      id_opaie:   this.option,
      id_student: this.cuser.id,
      id_promo:   this.promo.id,
    };
    console.log(udata);
    const url = `${environment.apiUrl}addStudentToPromo`;
    this.app
      .setData(url, udata)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = 'Etudiant affecté avec succès';
            this.users.splice(this.index, 1);
            if (this.users.length <= 0) {
              this.router.navigate(['/app/management']);
            } else {
               if (this.index > 0 ) {
                 --this.index;
              } else if (this.index == 0) {
                this.index++;
              }
            }
            this.arrange();
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );
  }

}
