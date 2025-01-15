import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { StudentsService } from 'src/app/_Services/StudentsService';

@Component({
  selector: "app-bulletin-frag",
  templateUrl: "./bulletin-frag.component.html",
  styleUrls: ["./bulletin-frag.component.css"],
})
export class BulletinFragComponent implements OnInit {
  IDP: any;
  POS: number;
  promo: any;
  marge=10;
  mot = "Mention"; mot2="";
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
    this.ID = this.route.snapshot.params.idu;
    this.IDF = this.route.snapshot.params.idf;
    this.POS = -1;
    this.IDP = this.route.snapshot.params.idp;
    this.init();
  }

  init() {
    this.total = { note: 0, coef: 0 };
    this.getEtabInfo();
    this.getResult();
    this.getPF();
    this.getMoyGen();
    this.getParcours();
    this.getPROMO();
  }
  setPage(idu) {
    this.ID = idu;
  }

  changePage(idu, idf, i) {
    this.ID = idu;
    this.POS = i;
    this.init();
  }

  getPF() {
    this.app
      .getData(`${environment.apiUrl}promoFrags/${this.IDF}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pf = data;
        },
        (error) => {}
      );
  }
  getMoyGen() {
    this.app
      .getData(`${environment.apiUrl}getMoyGenFrag/${this.IDF}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.moy = data;
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

  getPROMO() {
    this.app
      .getData(`${environment.apiUrl}promotions/${this.IDP}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promo = data;
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
          console.log(data);
          this.iloading = false;
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
          // this.setPrint();
        },
        (error) => {
          this.iloading = false;
        }
      );
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

  // setPrint() {
    // const u : { print: 0 } = this.STUDS[this.POS];
    // u.print++;
    // const DATA = {
      // print: u.print,
    // };
    // this.app
      // .editData(`${environment.apiUrl}parcours_frags/${this.ID}`, DATA)
      // .pipe(first())
      // .subscribe(
        // (data) => {
          // this.STUDS[this.POS] = data;
        // },
        // (error) => {}
      // );
  // }


}
