import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: "app-note-factory",
  templateUrl: "./note-factory.component.html",
  styleUrls: ["./note-factory.component.css"],
})
export class NoteFactoryComponent implements OnInit {
  [x: string]: any;
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  response = { state: "", message: "", active: false };
  af: any;
  apromo = [];
  cpromo = {
    max_student: 100,
    promofrag: [],
    moy_accept: 0,
    moy_exc: 0,
    moy_reprise: 0,
    moy_total: 0,
    prog_id: 0,
    id: 0,
    code: "",
    code_niveau: "",
  };
  tpromo: number;
  index: number;
  ID: any;
  PROMO: any;
  newCours: any;
  hcours: any;
  afrags = [];
  nfrags = [];
  hpars;
  profs;
  cprof;
  loading = false;
  floading = [];
  p =[];


  ngOnInit() {
    this.getAF();
  }

  getAF() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
            this.apromo = data.data;
            if (this.apromo.length === 0) {
              this.router.navigate(["/app/management"]);
            }
            this.tpromo = this.apromo.length;
            this.index = 1;
            this.arrange();
          } else {
            this.router.navigate(["/app/management"]);
          }
        },
        (error) => {
          this.router.navigate(["/app/management"]);
        }
      );
  }
  next() {
    this.index++;
    this.arrange();
  }
  prev() {
    --this.index;
    this.arrange();
  }
  arrange() {
    this.pars = [];
    this.frags = [];
    this.option = undefined;
    const cpromo = this.apromo[this.index - 1];
    this.ID = cpromo.id;
    this.PROMO = cpromo;
    window.scroll(0, 0);
   // this.getFrags();
    this.getPromo(this.ID);
  }
  getPromo(ID) {
    this.app
      .getData(`${environment.apiUrl}getPromo/${ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data.data;
          this.cpromo = this.PROMO;
          this.frags = this.PROMO.promofrag;
        },
        () => {}
      );
  }

  init() {
    this.pars = [];
    this.option = undefined;
    window.scroll(0, 0);
  }

  iloading = false;

  initStudent() {
    this.iloading = true;
    this.app
      .getData(
        `${environment.apiUrl}addStudentToPromoFrag/${this.option.id}/${this.PROMO.id}`
      )
      .pipe(first())
      .subscribe(
        (data) => {
        },
        (error) => {
        }
      );
  }

  frags: any;
  option;
  change() {
   // this.getPFrags();
    this.getPalmares()
  }

  pars = [];

  getPFrags() {
    this.response.active = false;
    let url = `${environment.apiUrl}getParcoursFrags/${this.option.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          this.response.message = data.message;
          if (!data.crash) {
            this.response.state = "success";
            this.pars = data.data;
          } else {
            this.response.state = "danger";
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
        }
      );
  }
  see = [];
  initResult() {
    this.response.active = false;
    let url = `${environment.apiUrl}initResults/${this.option.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
           this.getPalmares();
          } else {
            this.response.active = true;
            this.response.message = data.message;
            this.response.state = "danger";
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
        }
      );
  }

  save(notes) {
    notes.forEach((item) => {
     console.log(item);
      this.setResults(item);
    });
  }
  msg = [];
  err = [];
  setResults(item) {
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
            this.msg[item.idr] =
              " La nouvelle note " +
              " est " +
              item.note +
              "/" +
              item.note_total;
          },
          (error) => {
            this.err[item.idr] = error;
          }
        );
    } else {
      this.err[item.idr] =
        "La note doit être inferieur a " + item.note_total + " ";
    }
  }

 getPalmares() {
    this.app
      .getData(`${environment.apiUrl}getPalmares/${this.option.id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data.data.cours;
          this.pars = data.data.etudiants;
          this.setTotal();
        },
        (error) => {}
      );
  }

cours = [];

 setTotal() {
    // tslint:disable-next-line:prefer-for-of
    for (let y = 0; y < this.pars.length; y++) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.pars[y].results.length; i++) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.pars[y].mresults.length; j++) {
          if (this.pars[y].results[i].idc === this.pars[y].mresults[j].idc) {
              this.pars[y].results[i].note = this.pars[y].mresults[j].note;
              this.pars[y].results[i].idr = this.pars[y].mresults[j].idr;
              this.pars[y].results[i].coef = this.pars[y].mresults[j].coef;
              this.pars[y].results[i].note_total = this.pars[y].mresults[j].note_total;
          }
        }
      }
    }
  }

}
