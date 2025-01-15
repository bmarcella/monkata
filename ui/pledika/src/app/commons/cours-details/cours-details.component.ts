import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: "app-cours-details",
  templateUrl: "./cours-details.component.html",
  styleUrls: ["./cours-details.component.css"],
})
export class CoursDetailsComponent implements OnInit {
  // /////
  ID: BigInteger;
  cours: any;
  response = { state: "", message: "", active: false };
  ceprof: any;
  emat: any = {
    id: 0,
    coef: "",
    name: "",
    note_total: "",
    prof: "",
    mat: {},
    note_pass: 0,
    note_rep: 0,
    note_excel: 0,
    _links: {},
    book_name: "",
    option: "",
    mprof_id: "",
  };
  esprof = false;
  loading: boolean;
  smat: any;
  cemat: any;
  esmat: boolean;
  profs: any;
  cp: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    public studServ: StudentsService,
    public app: AppService
  ) {}
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getCourses();
    this.getSMatieres();
    this.getProf();
  }
  getCourses() {
    const url = `${environment.apiUrl}courses/${this.ID}`;
    console.log(url);
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.emat = data;
          this.cemat = data;
          this.getCProf(data._links.prof.href);
          console.log(data);
        },
        (error) => {}
      );
  }

  onEditChange(e) {
    this.cemat = e;
    this.emat.coef = e.coef;
    this.emat.note_total = e.note_total;
    this.emat.note_pass = e.note_pass;
    this.emat.note_rep = e.note_rep;
    this.emat.note_excel = e.note_excel;
    this.emat.name = e.name;
  }

  onEditChangeProf(e) {
    this.ceprof = e;
  }

  getSMatieres() {
    const url = `${environment.apiUrl}sMatieres/?size=1000&sort=code,asc`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.smat = data._embedded.sMatieres;
        },
        (error) => {}
      );
  }
  getProf() {
    const url = `${environment.apiUrl}getProfForCours`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.profs = data.data;
        },
        (error) => {}
      );
  }

  getCProf(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cp = data;
          this.ceprof = data;
        },
        (error) => {}
      );
  }

  editCourse() {
    if (this.loading) {
      return;
    }
    this.emat.note_rep = parseInt(this.emat.note_rep);
    this.emat.note_pass = parseInt(this.emat.note_pass);
    this.emat.note_excel = parseInt(this.emat.note_excel);
    if (
      this.emat.note_rep > 0 &&
      this.emat.note_rep < this.emat.note_total &&
      this.emat.note_pass > 0 &&
      this.emat.note_pass < this.emat.note_total &&
      this.emat.note_excel > 0 &&
      this.emat.note_excel < this.emat.note_total
    ) {
      this.loading = true;
      const $POST = {
        name: `${this.emat.name}`,
        coef: this.emat.coef,
        code: `${this.emat.name}-${this.emat.option}-${this.ceprof.id}-${this.cemat.id}`,
        note_total: this.emat.note_total,
        book_name: this.emat.book_name,
        matiere_id: this.cemat.id,
        mprof_id: this.ceprof.id,
        prof: `${environment.apiUrl}userEntities/${this.ceprof.id}`,
        smatiere: `${environment.apiUrl}sMatieres/${this.cemat.id}`,
        note_rep: parseFloat(this.emat.note_rep),
        note_pass: parseFloat(this.emat.note_pass),
        note_excel: parseFloat(this.emat.note_excel),
      };

      const url = `${environment.apiUrl}courses/${this.emat.id}`;
      this.app
        .editData(url, $POST)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            if (data != null) {
              this.emat = data;
              this.response.state = "success";
              this.response.message = "Modification affectuée avec succes";
            } else {
              this.response.state = "danger";
              this.response.message = "Erreur serveur";
            }
          },
          (error) => {
            this.response.active = true;
            this.response.state = "danger";
            this.response.message = error;
            this.loading = false;
          }
        );
    } else {
      this.response.active = true;
      this.response.state = "danger";
      this.response.message = "les notes sont incorrects";
      this.loading = false;
    }
  }

  editsMat() {
    this.esmat = true;
  }

  closesMat() {
    this.esmat = false;
  }
}
