import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-palmares',
  templateUrl: './palmares.component.html',
  styleUrls: ['./palmares.component.css']
})
export class PalmaresComponent implements OnInit {
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
  promos = [];
  promo;
  role;
  etab: any;
  e;
  terme = "action";
  ctotal = [{}];
  tCoef = 0;

  msg = [];
  err = [];
  edit = false;
  loading = false;
  getMarge(div, i) {
    return "50px";
  }
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.IDP = this.route.snapshot.params.idp;
    this.getEtabInfo();
    this.getPromo();
    this.getPromoFrag();
    this.getPalmares();
  }
  setTotalCoef() {
    for (let i = 0; i < this.cours.length; i++) {
      this.tCoef += this.cours[i].coef * this.cours[i].note_total;
    }
  }


  focus =[];


  getPalmares() {
    this.app
      .getData(`${environment.apiUrl}getPalmaresV/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.cours = data.data.cours;
          this.setTotalCoef();
          this.p = data.data.etudiants;
        },
        (error) => {}
      );
  }

  getPromo() {
    this.app
      .getData(`${environment.apiUrl}promotions/${this.IDP}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promo = data;
          console.log(data);
        },
        (error) => {}
      );
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

  getPromoFrag() {
    this.app
      .getData(`${environment.apiUrl}promoFrags/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pf = data;
        },
        (error) => {}
      );
  }

}
