import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-releve',
  templateUrl: './releve.component.html',
  styleUrls: ['./releve.component.css']
})
export class ReleveComponent implements OnInit {

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
     this.getEtabInfo();
     this.getAcad();
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
  getYear(a){
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

  getCPromo(a){
    this.promo = a;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.getCPromoFrag(a._links.promofrag.href);
  }
 getCPromoFrag(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pfrags = data._embedded.promoFrags;
        },
        (error) => {}
      );
  }

 getCFrag(a){
  this.ID = a.id;
  this.pf = a;
  this.getPalmares();
 }



  setTotalCoef() {
    for (let i = 0; i < this.cours.length; i++) {
      this.tCoef += this.cours[i].coef * this.cours[i].note_total;
    }
  }

  setTotal() {
    // tslint:disable-next-line:prefer-for-of
    for (let y = 0; y < this.p.length; y++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.p[y].mresults.length; j++) {
        this.p[y].total +=this.p[y].mresults[j].note * this.p[y].mresults[j].coef;
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.p[y].results.length; i++) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.p[y].mresults.length; j++) {
          if (this.p[y].results[i].idc === this.p[y].mresults[j].idc) {
            this.p[y].results[i].note = this.p[y].mresults[j].note;
            this.p[y].results[i].idr = this.p[y].mresults[j].idr;
            this.p[y].results[i].coef = this.p[y].mresults[j].coef;
            this.p[y].results[i].note_total = this.p[y].mresults[j].note_total;
          }
        }
      }
    }
  }
  focus =[];
 arrangeTotal(){
 // tslint:disable-next-line:prefer-for-of
 for (let y = 0; y < this.p.length; y++) {
   // tslint:disable-next-line:prefer-for-of
   this.p[y].total = 0;
   for (let j = 0; j < this.p[y].results.length; j++) {
     this.p[y].total += this.p[y].results[j].note * this.p[y].results[j].coef;
   }
 }
 }

  es($event,c) {
     window.document.getElementById(c.idr).blur();
     this.editResults(c);
  }

  getPalmares() {
    this.app
      .getData(`${environment.apiUrl}getPalmares/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.cours = data.data.cours;
          this.setTotalCoef();
          this.p = data.data.etudiants;
          this.setTotal();
        },
        (error) => {}
      );
  }


  editResults(item) {
    this.msg[item.idr] = null;
    this.err[item.idr] = null;
    // tslint:disable-next-line: radix
    if (parseInt(item.note) <= parseInt(item.note_total)) {
      this.loading = true;
      const $_POST = {
        note: item.note,
      };
      this.app
        .editData(`${environment.apiUrl}resultses/${item.idr}`, $_POST)
        .pipe(first())
        .subscribe(
          (data) => {
            // console.log(data);
            this.msg[item.idr] = item.note + "/" + item.note_total;
            this.arrangeTotal();
            this.focus[item.idr]=false;
            setTimeout(() => {
                 this.msg[item.idr] = null;
                 this.err[item.idr] = null;
            }, 3000);
          },
          (error) => {
            this.err[item.idr] = error;
            setTimeout(() => {
              this.msg[item.idr] = null;
              this.err[item.idr] = null;
            }, 3000);
          }
        );
    } else {
      this.err[item.idr] = "Note < " + item.note_total + " ";
      setTimeout(() => {
        this.msg[item.idr] = null;
        this.err[item.idr] = null;
      }, 3000);
    }
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
          console.log(data);
        },
        (error) => {}
      );
  }
  getNotes(a, b) {
    for (let i = 0; i < a.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < b.length; j++) {
        if (a[i].idc === b[j].idc) {
          a[i].note = b[j].note;
          a[i].idr = b[j].idr;
          a[i].coef = b[j].coef;
          a[i].note_total = b[j].note_total;
        }
      }
    }
    return a;
  }

  initResult() {
    let url = `${environment.apiUrl}initResults/${this.ID}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
          } else {
          }
        },
        (error) => {

        }
      );
  }

}
