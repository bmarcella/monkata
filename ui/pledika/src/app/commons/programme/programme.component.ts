import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {
  prog = [];
  loading;
  profs: any;
  mats: any;
  cours: any;
  cmat: any;
  option: any;
  options: any;
  mat: any = {name: '', desc: '',code:''};
  response = { state: '', message: '', active: false };
  submitted = false;
  page: any;

  constructor(public nServ: AppService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
  this.page = this.route.snapshot.params.page;
  this.getOptions();
  this.getProgs();
  }

  getOptions() {
    const url = `${environment.apiUrl}niveaus`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        data => {
          this.options = data._embedded.niveaus;
        },
        error => {
        }
      );
  }

  change() {
   this.mat.name  = this.option.name;
  }

  addProg() {
    if (this.loading) { return; }
    this.loading = true;
    const $POST = {
      code: `P-${this.option.code}-${this.mat.code}`,
      name: `${this.option.name}-${this.mat.code}`,
      description: this.mat.desc,
      niveau: this.option.code,
    };
    const url = `${environment.apiUrl}programmes`;
    this.nServ.setData(url, $POST).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.response.active = true;
          if (data != null) {
            this.response.state = 'success';
            this.response.message = 'Insertion affectuée avec succes';
            this.mat = { name: '', desc: '' };
            this.prog.push(data);
            this.router.navigate(['app/progDetails', data.id]);
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
          }
        },
        error => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );
  }

  getProgs() {
    const url = `${environment.apiUrl}programmes?size=200`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        data => {
          this.prog = data._embedded.programmes;
        },
        error => {
        }
      );
  }

}
