import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-mnots',
  templateUrl: './mnots.component.html',
  styleUrls: ['./mnots.component.css']
})
export class MnotsComponent implements OnInit {
constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private elRef: ElementRef
  ) {}
  POS: any;
  hcours: any;
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
  terme = 'action';
  ctotal = [{}];
  tCoef = 0;

  msg = [];
  err = [];
  edit = false;
  loading = false;


  focus = [];
  see = true;
  full_page =  100;
  init_page = 33;
  page = 678;
  tpage = 750;
  sign = 62;
  coef = 10;
  bonus = 80;
  hgt = 10;
  words="1ctrl/2ctrl/3ctrl/4ctrl";
  getMarge(div, i) {
    return '50px';
  }
  period = false;
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.IDP = this.route.snapshot.params.idp;
    this.getEtabInfo();
    this.getPromoFrag();
    this.getPalmares();
  }

  setTC(o) {
    if (o.id === this.ID) {
      return 'white';
    }
    return '';
  }

  setPage(idu) {
    this.ID = idu;
  }

  changePage(idu, idf, i) {
    this.ID = idu;
    this.POS = i;
  }
  setTotalCoef() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cours.length; i++) {
      this.tCoef += this.cours[i].coef * this.cours[i].note_total;
    }
  }


  getPalmares() {
    this.app
      .getData(`${environment.apiUrl}getPalmaresV/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.cours = data.data.cours;
          this.hcours = this.cours;
          this.setTotalCoef();
          this.p = data.data.etudiants;
          this.hgt = (this.p.length*-20) + 1560;
        },
        (error) => {}
      );
  }
 setBG(o) {
    // tslint:disable-next-line:triple-equals
    if (o == this.ID) {
      return '#34c929';
    }
    return '';
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

  onKey(e: { target: { value: any } }) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.cours = this.filterItems(query);
    } else {
      this.cours = this.hcours;
    }
  }

  filterItems(searchTerm: string) {
    return this.cours.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
 getHeight(h, i) {
let lh = 0;
if (h <= this.init_page) {
    this.hgt = 80;
   } else {
    lh = h - this.init_page;
    lh++;
    const box = ((lh * this.coef) + this.sign) ;
    if ( box <= this.tpage) {
      const ht = this.tpage - box;
      this.hgt= ( ht + this.bonus);
    } else {
       --lh;
       let box = ((lh * this.coef) + this.sign)  ;
       const div_1 = Math.floor(box / this.tpage);
       const div = box / this.tpage;
       const rdiv = div - div - 1;
       if (rdiv !== 0) {
       lh = rdiv * this.tpage;
       box = ((lh * this.coef) + this.sign) ;
       const ht = this.tpage - box;
       this.hgt = ht + this.bonus;
      }
    }
   }
 }

}
