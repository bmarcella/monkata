import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private auth: AuthenticationService
  ) {
  this.user = this.auth.currentUserValue;
 }
  frags: any;
  cfrag: any;
  user: any;
  IDP;
  IDF;
  IDC;
  loading;
  hloading;
  results;
  msg = [];
  fhjour;
  fhheure;
  chheure;
  frag_cours = [];

  fcours;
  hresults = [];
  note = [];

  iloading;

  hcours: any;

  cCtrl = false;
  ngOnInit() {
    this.IDP = this.route.snapshot.params.idp;
    this.IDF = this.route.snapshot.params.idf;
    this.IDC = this.route.snapshot.params.idcf;
    this.getFrag();
    this.initFPage();
  }

  changePage(p) {
    this.IDC = p;
    this.initPage();
  }

  changeCtrl(p) {
    this.cfrag = p;
    this.IDF = p.id;
    this.cCtrl = true;
    this.IDC = -1;
    this.initCPage();
  }
  initCPage() {
    this.loading = false;
    this.hloading = false;
    this.cCtrl = true;
    this.getAllFcours(this.IDF);
  }
  initFPage() {
    this.getAllFcours(this.IDF);
    this.getResults();
    this.getFcours(this.IDC);
    this.getAllFcours(this.IDF);
    this.loading = false;
    this.hloading = false;
  }

  initPage() {
    this.loading = false;
    this.hloading = false;
    this.cCtrl = false;
    this.getResults();
    this.getFcours(this.IDC);
  }

  getFrag() {
    this.app.getData(`${environment.apiUrl}promotions/${this.IDP}/promofrag`)
      .pipe(first())
      .subscribe(
        data => {
          this.frags = data._embedded.promoFrags;
          this.setCurrent();
        },
        error => {
        }
      );
  }

  setCurrent() {
   this.frags.forEach(e => {
      if (e.id == this.IDF) {
      this.cfrag = e;
     }
   });
  }
  getFcours(IDC) {
    this.app
      .getData(`${environment.apiUrl}frag_courses/${this.IDC}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.fcours = data;
          this.getHcours(data._links.hcours.href);
        },
        (error) => {}
      );
  }

  getAllFcours(IDF) {
    this.app
      .getData(`${environment.apiUrl}promoFrags/${this.IDF}/frag_cours`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.frag_cours = data._embedded.frag_courses;
        },
        (error) => {}
      );
  }

  initResults() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.app
      .getData(`${environment.apiUrl}initResult/${this.IDF}/${this.IDC}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.results = data.data;
          this.hresults = this.results;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getHcours(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.hcours = data._embedded.hCourses;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getResults() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const url = `${environment.apiUrl}getResult/${this.IDC}`;
    // let url = `${environment.apiUrl}resultses?frag_cours.id=${this.IDC}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          // console.log(data);
          this.loading = false;
          this.results = data.data;
          this.hresults = this.results;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  setResults(item, i) {
    if (this.loading) {
      return;
    }
    this.msg[i] = null;
    this.note[i] = null;
    // tslint:disable-next-line: radix
    if (parseInt(item.note) <= parseInt(item.note_total)) {
      this.loading = true;
      const $_POST = {
        note: item.note,
      };
      this.app
        .editData(`${environment.apiUrl}resultses/${item.id}`, $_POST)
        .pipe(first())
        .subscribe(
          (data) => {
            // console.log(data);
            this.loading = false;
            this.results[i].note = data.note;
            this.hresults[i].note = data.note;
            this.note[i] =
              ' La nouvelle note de ' +
              item.nom +
              ' ' +
              item.pnom +
              ' est ' +
              item.note +
              '/' +
              item.note_total;
          },
          (error) => {
            this.loading = false;
          }
        );
    } else {
      this.msg[i] = 'La note doit être inferieur a ' + item.note_total + ' ';
    }
  }
  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.results = this.filterItems(query);
    } else {
      this.results = this.hresults;
    }
  }

  filterItems(searchTerm) {
    return this.results.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  closeExamen(state) {
    const POST = {
      examen: state,
    };
    const url = `${environment.apiUrl}frag_courses/${this.IDC}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.fcours.examen = state;
        },
        (error) => {}
      );
  }

  closeBase(state) {
    const POST = {
      base: state,
    };
    const url = `${environment.apiUrl}frag_courses/${this.IDC}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.fcours.base = state;
        },
        (error) => {}
      );
  }
  del(id, i) {
    if (this.iloading) {
      return;
    }
    this.iloading = true;
    this.app
      .delData(`${environment.apiUrl}resultses/${id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          this.results.splice(i, 1);
          this.hresults = this.results;
        },
        (error) => {
          this.iloading = false;
        }
      );
  }

  addHCours(j, h, hc) {
    if (this.hloading) {
      return;
    }
    this.hloading = true;
    const fh = h+"-"+hc;
    const POST = {
      frag_cours: `${environment.apiUrl}frag_courses/${this.fcours.id}`,
      heure_cours: fh,
      jours: j,
      code: j + '-' + fh + '-' + this.IDF,
    };
    const url = `${environment.apiUrl}hCourses`;
    this.app
      .setData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.hloading = false;
          this.hcours.push(data);
        },
        () => {
          this.hloading = false;
        }
      );
  }
  delHCours(id, hi) {
    if (this.hloading) {
      return;
    }
    this.hloading = true;
    const url = `${environment.apiUrl}hCourses/${id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          this.hcours.splice(hi, 1);
        },
        () => {
          this.iloading = false;
        }
      );
  }

rr() {
    this.app.getData(`${environment.apiUrl}deleteResult/${this.IDC}`)
      .pipe(first())
      .subscribe(
        data => {
          this.results = [];
          this.hresults = this.results;
        },
        error => {
        }
      );
  }
}
