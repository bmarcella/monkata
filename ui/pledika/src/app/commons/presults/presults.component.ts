import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-presults',
  templateUrl: './presults.component.html',
  styleUrls: ['./presults.component.css']
})
export class PresultsComponent implements OnInit {


  constructor(private route: ActivatedRoute, private app: AppService) { }
  IDP;
  IDF;
  IDC;
  loading;
  hloading;
  results;
  msg = [];
  fhjour;
  fhheure;

  fcours;
  hresults = [];
  note = [];

  iloading;

  hcours: any;
  ngOnInit() {
    this.IDP = this.route.snapshot.params.idp;
    this.IDF = this.route.snapshot.params.idf;
    this.IDC = this.route.snapshot.params.idcf;
    this.getResults();
    this.getFcours(this.IDC);
  }
  getFcours(IDC) {
    this.app.getData(`${environment.apiUrl}frag_courses/${this.IDC}`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.fcours = data;
          this.getHcours(data._links.hcours.href);
        },
        error => {

        }
      );
  }

  initResults() {
    if (this.loading) { return; }
    this.loading = true;
    this.app.getData(`${environment.apiUrl}initResult/${this.IDF}/${this.IDC}`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.results = data.data;
          this.hresults = this.results;
        },
        error => {
          this.loading = false;
        }
      );
  }

  getHcours(url) {
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.hcours = data._embedded.hCourses;
        },
        error => {
          this.loading = false;
        }
      );
  }

  getResults() {
    if (this.loading) { return; }
    this.loading = true;
    const url = `${environment.apiUrl}getResult/${this.IDC}`;
    // let url = `${environment.apiUrl}resultses?frag_cours.id=${this.IDC}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          this.loading = false;
          this.results = data.data;
          this.hresults = this.results;
        },
        error => {
          this.loading = false;
        }
      );
  }

  setResults(item, i) {
    if (this.loading) { return; }
    this.msg[i] = null;
    this.note[i] = null;
    // tslint:disable-next-line: radix
    if (parseInt(item.note) <= parseInt(item.note_total)) {
      this.loading = true;
      const $_POST = {
        note: item.note
      };
      this.app.editData(`${environment.apiUrl}resultses/${item.id}`, $_POST)
        .pipe(first())
        .subscribe(
          data => {
            // console.log(data);
            this.loading = false;
            this.results[i].note = data.note;
            this.hresults[i].note = data.note;
            this.note[i] = ' La nouvelle note de '
              + item.nom + ' ' + item.pnom + ' est ' + item.note + '/' + item.note_total;
          },
          error => {
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
    return this.results.filter(item => {
      return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  closeExamen(state) {
    const POST = {
      examen: state
    };
    const url = `${environment.apiUrl}frag_courses/${this.IDC}`;
    this.app.editData(url, POST).pipe(first())
      .subscribe(
        data => {
          this.fcours.examen = state;
        },
        error => {
        }
      );
  }
  del(id, i) {
    if (this.iloading) { return; }
    this.iloading = true;
    this.app.delData(`${environment.apiUrl}resultses/${id}`)
      .pipe(first())
      .subscribe(
        data => {
          this.iloading = false;
          this.results.splice(i, 1);
          this.hresults = this.results;
        },
        error => {
          this.iloading = false;
        }
      );
  }

  addHCours(j, h) {
    if (this.hloading) {
      return;
    }
    this.hloading = true;
    const POST = {
      frag_cours: `${environment.apiUrl}frag_courses/${this.fcours.id}`,
      heure_cours: h,
      jours: j,
      code: j + '-' + h + '-' + this.fcours.id
    };
    const url = `${environment.apiUrl}hCourses`;
    this.app.setData(url, POST).pipe(first())
      .subscribe(
        data => {
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
    this.app.delData(url).pipe(first())
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


}
