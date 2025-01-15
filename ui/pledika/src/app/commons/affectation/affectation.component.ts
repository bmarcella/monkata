import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_model/User';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  [x: string]: any;
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('All_USER'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
 }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  response = { state: '', message: '', active: false };
  af: any;
  apromo = [];
  promo: any;
  ID: any;
  users: any;
  husers: any;
  option = [];
  loading = [];
  OP: any;
  isLoad = false;
  cpromo = [];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

  ngOnInit() {
    this.getAF();
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
          if ( this.af != null) {
              this.apromo = this.af.promotion;
         }
        },
        (error) => {}
      );
  }
 setActived(a) {
   this.promo = a;
   this.getOP();
   this.reload();
   this.getPS();
 }




  close() {
    this.promo = null;
    this.users=[];
    this.STUDS = [];
    this.HSTUDS = this.STUDS;
  }
 dloading=[];
 mpage=0;
 ispLoad=false;
 STUDS=[];
 HSTUDS=[];
 getUC(){
   this.mpage=1;
 }

  remSTP(o, i) {
    if (this.dloading[i]) {
      return;
    }
    this.dloading[i] = true;
    const url = `${environment.apiUrl}delStudentToPromo/${o.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (!data.crash) {
            this.dloading[i] = false;
            this.STUDS.splice(i, 1);
            this.response.state = "success";
            this.response.message = "Etudiant supprimé de cette promotion";
            this.HSTUDS = this.STUDS;
          } else {
            this.response.state = "danger";
            this.response.message = "erreur serveur";
          }
        },
        (error) => {
          this.dloading[i] = false;
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
        }
      );
  }

  getPS() {
    const url = `${environment.apiUrl}promotions/${this.promo.id}/parcours`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data._embedded.parcourses;
          this.HSTUDS = this.STUDS;
          this.ispLoad = true;
          console.log(data);
        },
        (error) => { this.ispLoad = true; }
      );
  }
  reload() {
      const url = `${environment.apiUrl}getStudentForPromoV3/${this.promo.id}`;
      this.app
        .getData(url)
        .pipe(first())
        .subscribe(
          (data) => {
            this.users = data.data;
            this.husers = this.users;
            this.isLoad = true;
          },
          (error) => { this.isLoad = true; }
        );
  }

  onKeyV2(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.users = this.filterItemsV2(query);
      } else {
      this.users = this.husers;
    }
  }

  filterItemsV2(searchTerm) {
    return this.users.filter((item) => {
      return (
        item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.current_class.name
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  addSTP(s, o, i) {
    if (this.loading[i]) {
      return;
    }
    this.loading[i] = true;

    const udata = {
      id_opaie: o,
      id_student: s.id,
      id_promo: this.promo.id,
    };

    const url = `${environment.apiUrl}addStudentToPromo`;
    this.app
      .setData(url, udata)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading[i] = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = 'Etudiant affecté avec succès';
            this.users.splice(i, 1);
            this.husers = this.users;
            this.STUDS.push(data.data);
            this.HSTUDS = this.STUDS;
            this.setCal(udata);
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
            this.users.splice(i, 1);
            this.husers = this.users;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading[i] = false;
        }
      );
  }

setCal(data) {
 if (this.cpromo[data.id_promo] == null) {
   this.cpromo[data.id_promo] = 1;
  } else {
   this.cpromo[data.id_promo]++;
}
}

  setUserData(data) {
    localStorage.setItem('ALL_USER', JSON.stringify(data));
  }

getUserData() {
 return  JSON.parse(localStorage.getItem('ALL_USER'));
}
  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm) {
    return this.STUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}
