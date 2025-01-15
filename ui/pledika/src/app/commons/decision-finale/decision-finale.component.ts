import { DatePipe } from '@angular/common';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService} from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-decision-finale',
  templateUrl: './decision-finale.component.html',
  styleUrls: ['./decision-finale.component.css']
})
export class DecisionFinaleComponent implements OnInit {
  villes: any;

 constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private elRef: ElementRef
  ) {}
  cours: any;
  IDP: any;
  pf: any;
  vpromos = [];
  p;
  pos = 0;
  ID: any;
  users: any;
  promos;
  promo;
  role;
  etab: any;
  e;
  afs: any;
  cyear;
  cpromo;
  pfrags: any;
  cpfrag;
  terme = 'action';
  ctotal = [{}];
  tCoef = 0;

  msg = [];
  err = [];
  edit = false;
  loading = false;
  ca = 2;


  ann = 1;
  getMarge(div, i) {
    return '50px';
  }

 ngOnInit() {
     this.getEtabInfo();
     this.getAcad();
     this.getContext();
  }

 getContext() {
    this.app.getData(`${environment.apiUrl}context`)
      .pipe(first())
      .subscribe(
        data => {
          this.villes = data.data.vis;
        },
        error => {
        }
      );

  }
  getAcad() {
    const url = `${environment.apiUrl}promo_afs?size=1000`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.afs = data._embedded.promo_afs;
        },
        (error) => {}
      );
  }
  getYear(a) {
    this.cpromo = undefined;
    this.promos = undefined;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.getPromo(a._links.promotion.href);
  }
 getPromo(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promos = data._embedded.promotions;
        },
        (error) => {}
      );
  }

  getCPromo(a) {
    this.promo = a;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.getPalmares();
 }

  getPalmares() {
   const url = `${environment.apiUrl}getDecisionFinale/${this.promo.id}`;
   console.log(url);
   this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.p = data.data;
          console.log(data);
        },
        (error) => {}
      );
  }

getPOB(i){
 this.p[i].lieu_de_naiss;
}



  getEtabInfo() {
    this.app
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }

fDate(date){
    const nd = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    return nd;
  }


pob = [];
editUser(o, i) {

const DATA = {
nom_mere: o.nom_mere,
date_de_naiss : o.date_naiss,
identifiant: o.identifiant,
matricule:o.matricule,
annee_six:o.annee_six,
annee_neuv:o.annee_neuv,
annee_rheto: o.annee_rheto,
annee_philo: o.annee_philo
};
this.app.editData(`${environment.apiUrl}userEntities/${o.idu}`, DATA).pipe(first())
      .subscribe(
        (data) => {
console.log(data);
        },
        (error) => {
    console.log(error);
        }
      );
  }
response6 =  { state: '', message: '', active: false };
editLN(u,v,i) {
    if (!this.loading) {
      this.loading = true;
      const url = `${environment.apiUrl}editPOB/${u.idu}/${v.id}`;
      this.app.getData(url).pipe(first())
        .subscribe(
          data => {
            this.editPOB(u.idu,v.name,i);
            this.response6.active = true;
            this.loading = false;
            this.response6.state = 'success';
            this.response6.message = 'Modification affectuée avec succès';
          },
          error => {
            this.response6.active = true;
            this.response6.state = 'danger';
            this.response6.message = error;
            this.loading = false;
          }
        );

    }

  }
editPOB(id,name,i) {
    const url = `${environment.apiUrl}userEntities/${id}`;
    this.app.editData(url,{pob:name})
      .pipe(first())
      .subscribe(data => {
        this.p[i].lieu_de_naiss = name;
      }, error => {

      });
  }


}
