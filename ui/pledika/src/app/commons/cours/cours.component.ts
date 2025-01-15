import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: "app-cours",
  templateUrl: "./cours.component.html",
  styleUrls: ["./cours.component.css"],
})
export class CoursComponent implements OnInit {
  profs: any;
  mats: any;
  cours: any;
  cmat: any;
  loading;
  option: any;
  options: any;
  mat: any = {
    coef: "",
    name: "",
    note_total: "",
    prof: "",
    mat: {},
    note_pass: 0,
    note_rep: 0,
    note_excel: 0,
    book_name: "",
  };
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
    book_name:''
  };
  response = { state: "", message: "", active: false };
  submitted = false;
  page: any;
  smat: any;
  cedit: any;
  pos: any;
  id_mat: any;
  cemat: any;
  esmat: boolean;
  trie;

  constructor(public nServ: AppService) {}

  onChange(e) {
    this.cmat = e;
    this.mat.coef = e.coef;
    this.mat.note_total = e.note_total;
    this.mat.note_pass = e.note_pass;
    this.mat.note_rep = e.note_rep;
    this.mat.note_excel = e.note_excel;
    this.mat.name = e.name;
  }

  onEditChange(e) {
    this.cemat = e;
    this.emat.coef = e.coef;
    this.emat.note_total = e.note_total;
    this.emat.note_pass = e.note_pass;
    this.emat.note_rep = e.note_rep;
    this.emat.note_excel = e.note_excel;
    this.emat.name = e.name;
    console.log(this.cemat);
  }

  edit(o, i) {
    this.cemat = null;
    let url = o._links.smatiere.href;
    this.getCMat(url, o, i);
  }

  closeEdit() {
    this.emat = {
      book_name: "",
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
    };
    this.pos = -1;
  }

  editsMat() {
    this.esmat = true;
  }

  closesMat() {
    this.esmat = false;
  }

  getCMat(url, o, i) {
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cemat = data;
          this.emat = o;
          this.pos = i;
          window.scroll(0, 0);
        },
        (error) => {
          this.emat = o;
          this.pos = i;
          window.scroll(0, 0);
        }
      );
  }

  getId(h) {
    const ah = h.split("/");
    return ah[ah.length - 1];
  }

  change() {
    this.getCourses();
    this.getSMatieres();
  }

  ngOnInit() {
    this.getOptions();
    this.getProf();
    this.getMat();
  }

  getProf() {
    const url = `${environment.apiUrl}getProfForCours`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.profs = data.data;
        },
        (error) => {}
      );
  }

  getOptions() {
    const url = `${environment.apiUrl}options`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.options = data._embedded.options;
        },
        (error) => {}
      );
  }

  del(a, i) {
    const url = `${environment.apiUrl}courses/${a.id}`;
    this.nServ
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours.splice(i, 1);
        },
        (error) => {}
      );
  }

  getMat() {
    const url = `${environment.apiUrl}matieres`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.mats = data._embedded.matieres;
        },
        (error) => {}
      );
  }
  hcours;
  getCourses() {
    const url = `${environment.apiUrl}courses/?size=1000&option=${this.option.code}&sort=code,asc`;
    console.log(url);
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data._embedded.courses;
          this.hcours = this.cours;
        },
        (error) => {}
      );
  }

  getSMatieres() {
    const url = `${environment.apiUrl}sMatieres/?size=1000&option=${this.option.code}&sort=code,asc`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.smat = data._embedded.sMatieres;
        },
        (error) => {}
      );
  }

  addCourse() {
    if (this.loading) {
      return;
    }
    this.mat.note_rep = parseInt(this.mat.note_rep);
    this.mat.note_pass = parseInt(this.mat.note_pass);
    this.mat.note_excel = parseInt(this.mat.note_excel);
    if (
      this.mat.note_rep > 0 &&
      this.mat.note_rep < this.mat.note_total &&
      this.mat.note_pass > 0 &&
      this.mat.note_pass < this.mat.note_total &&
      this.mat.note_excel > 0 &&
      this.mat.note_excel < this.mat.note_total
    ) {
      this.loading = true;
      const $POST = {
        code: `${this.mat.name}-${this.option.code}-${this.mat.prof.id}-${this.cmat.id}`,
        name: `${this.mat.name}`,
        coef: this.mat.coef,
        book_name: this.mat.book_name,
        note_total: this.mat.note_total,
        matiere_id: this.cmat.id,
        mprof_id : this.mat.prof.id,
        smatiere: `${environment.apiUrl}sMatieres/${this.cmat.id}`,
        prof: `${environment.apiUrl}userEntities/${this.mat.prof.id}`,
        option: this.option.code,
        note_rep: parseFloat(this.mat.note_rep),
        note_pass: parseFloat(this.mat.note_pass),
        note_excel: parseFloat(this.mat.note_excel),
        actived: true,
      };

      const url = `${environment.apiUrl}courses`;
      this.nServ
        .setData(url, $POST)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            if (data != null) {
              this.response.state = "success";
              this.response.message = "Insertion affectuée avec succes";
              this.mat = {
                coef: "",
                name: "",
                note_total: "",
                prof: "",
                mat: {},
                note_pass: "",
                note_rep: "",
                note_excel: "",
              };
              this.cours.push(data);
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
        code: this.emat.code,
        note_total: this.emat.note_total,
        book_name: this.emat.book_name,
        matiere_id : this.cemat.id,
        smatiere: `${environment.apiUrl}sMatieres/${this.cemat.id}`,
        note_rep: parseFloat(this.emat.note_rep),
        note_pass: parseFloat(this.emat.note_pass),
        note_excel: parseFloat(this.emat.note_excel),
      };

      const url = `${environment.apiUrl}courses/${this.emat.id}`;
      this.nServ
        .editData(url, $POST)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            if (data != null) {
              this.response.state = "success";
              this.response.message = "Modification affectuée avec succes";
              this.emat = {
                id: 0,
                coef: "",
                name: "",
                note_total: "",
                prof: "",
                mat: {},
                note_pass: "",
                note_rep: "",
                note_excel: "",
                book_name: "",
              };
              this.closesMat();
              this.cours[this.pos] = data;
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

  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.cours = this.filterItems(query);
    } else {
      this.cours = this.hcours;
    }
  }

  filterItems(searchTerm) {
    return this.cours.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}
