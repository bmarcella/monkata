import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { Etab } from '../config/Etab';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

 constructor(private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private app: AppService) {
   this.etab = new Etab();
  }
  etab: Etab;
  loading;
  info = 1;
  response = { state: '', message: '', active: false };
  not = { cible: '', message: '', titre: ''};
  divs: any;
  edit = [];
  msg = [];
  note = [];

  progress;
  ngOnInit() {
  this.getAD();
  }



  getAD() {
    const url = `${environment.apiUrl}fragments`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.divs = data._embedded.fragments;
          console.log(this.divs);
        },
        error => {
        }
      );
  }

toggleDiv(d, s, i) {
  const url = `${environment.apiUrl}fragments/${d.id}`;
  this.app.editData(url, s)
      .pipe(first())
      .subscribe(
        data => {
          this.divs[i] = data;
        },
        error => {
        }
      );
  }
delDiv(d, i) {
  const url = `${environment.apiUrl}fragments/${d.id}`;
  this.app.delData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.divs.splice(i,1);
        },
        error => {
        }
      );
  }
}
