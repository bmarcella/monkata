import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-releve-note',
  templateUrl: './releve-note.component.html',
  styleUrls: ['./releve-note.component.css']
})
export class ReleveNoteComponent implements OnInit {

  IDP: any;
  POS: number;
  promo: any;
  afs: any;
  cyear;
  cpromo;
  promos: any;
  pfrags: any;
  cpfrag;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    public studServ: StudentsService
  ) {}
  iloading: boolean;
  STUDS = [];
  HSTUDS: any;

  etab: any;
  ID: any;
  IDF: any;
  USER: any;
  results: any = [];

  // tslint:disable-next-line:variable-name
  total = { note: 0, coef: 0 };

  // tslint:disable-next-line:variable-name
  pf: any;
  moy = 1;

  setBG(o) {
    // tslint:disable-next-line:triple-equals
    if (o == this.ID) {
      return "#34c929";
    }
    return "";
  }

  setTC(o) {
    if (o.id == this.ID) {
      return "white";
    }
    return "";
  }

  ngOnInit() {
     this.POS = -1;
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
    console.log(a);
    this.cpromo = undefined;
    this.promos = undefined;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.STUDS = [];
    this.HSTUDS = []
    this.getPromo(a._links.promotion.href);
  }

  getCPromo(a){
    this.promo = a;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.STUDS = [];
    this.HSTUDS = [];
    this.getCPromoFrag(a._links.promofrag.href);
  }

 getCFrag(a){
  this.IDF = a.id;
  this.pf = a;
  this.getParcours();
 }

getParcours() {
    if (this.iloading) {
      return;
    }
    this.iloading = true;
    const url = `${environment.apiUrl}getPars_cours/${this.IDF}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
          this.setPrint();
        },
        (error) => {
          this.iloading = false;
        }
      );
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

  init() {
    this.total = { note: 0, coef: 0 };
    this.getResult();
  }
  setPage(idu) {
    this.ID = idu;
  }

  changePage(idu, idf, i) {
    this.ID = idu;
    this.POS = i;
    this.init();
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
  getResult() {
    this.app
      .getData(`${environment.apiUrl}getBulletinFrag/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.results = data.data;
          this.getSetTotal(this.results);
        },
        (error) => {}
      );
  }

  getSetTotal(o) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < o.length; i++) {
      const t = o[i].coef * o[i].note;
      this.total.note += t;
      const x = o[i].coef * o[i].note_total;
      this.total.coef += x;
    }
  }


  onKey(e: { target: { value: any } }) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm: string) {
    return this.STUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  setPrint() {
    const u: { print: 0 } = this.STUDS[this.POS];
    u.print++;
    const DATA = {
      print: u.print,
    };
    this.app
      .editData(`${environment.apiUrl}parcours_frags/${this.ID}`, DATA)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS[this.POS] = data;
        },
        (error) => {}
      );
  }

}
