import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private app: AppService, private elRef: ElementRef) { }
  vpromos = [];
  hgt = 10;
  ID: any;
  users: any;
  promos = [];
  role;
  etab: any;
  // e;
  see=true;
 terme = 'action';
 getMarge(div, i) {
    return '50px';
  }
  ngOnInit() {
    this.getEtabInfo();
    this.getPromo();
  }

  getPromo() {
    this.app.getData(`${environment.apiUrl}getAllStudent`)
      .pipe(first())
      .subscribe(
        data => {
          this.setup(data.data);
        },
        error => {
           console.log(error);
        }
      );
  }

 setup(data) {
  // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
    const code = data[i].classe.replace(/\s/g, '_');
    const page = -1;
    if (this.promos[code]) {
        this.promos[code].push(data[i]);
    } else {
      this.promos[code] = [];
      this.promos[code].push(data[i]);
   }
  }
    this.clean();
}

clean() {
  for (let i in this.promos) {
      if (this.promos[i] != null || this.promos[i] != undefined ) {
          this.vpromos.push(this.promos[i]);
      }
  }
}


getParcours() {
    this.app.getData(`${environment.apiUrl}getParcours/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.users = data.data;
        },
        error => {
          console.log(error);
        }
      );
  }

getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
        },
        error => {
        }
      );
  }

}
