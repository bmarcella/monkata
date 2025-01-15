import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-aereprise',
  templateUrl: './aereprise.component.html',
  styleUrls: ['./aereprise.component.css']
})
export class AERepriseComponent implements OnInit {


  constructor(private route: ActivatedRoute, private app: AppService) { }
  ID: any;
IDF;
  PROMO: any;
  NPROMO: any;
  STUDS: any;
  HSTUDS: any;
  OP: any;
  caf: any;
  cpromo;
  option = [];
  loading = [];
  afs = [];
  response = { state: '', message: '', active: false };
  checkArray = [];
  all = false;
// tslint:disable-next-line: member-ordering
  PROMOS = [];
  moption;
  mloading;

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.IDF = this.route.snapshot.params.idf;
    this.init();
  }

init() {
  this.getStudents();
  this.getPromo();
}





  getPromo() {
    this.app
      .getData(`${environment.apiUrl}promotions/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data;

        },
        () => { }
      );
  }

change() {}




  getStudents() {
    this.app
      .getData(`${environment.apiUrl}getStudentForReprise/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        () => { }
      );
  }

  onKeyUp(e) {
    const query = e.target.value;
    if (query !== null && query !== '' && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm) {
    return this.STUDS.filter((item) => {
      return (
        item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  addSTP(s, i) {
    if (this.loading[i]) {
      return;
    }
    this.loading[i] = true;
    this.response.active = false;
    const url = `${environment.apiUrl}addOneStudentToPromoFrag/${this.IDF}/${s.idp}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading[i] = false;
          this.response.active = true;
          console.log(data);
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = 'Etudiant ajouté en reprise';
            const user = data.data;
            this.STUDS.splice(i, 1);
            this.HSTUDS = this.STUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading[i] = false;
        }
      );
  }
  onCheckboxChange(e, y) {
    if (e.target.checked) {
      this.checkArray.push(e.target.value);
      this.STUDS[y].isSelected = true;
    } else {
      let i = 0;
      this.STUDS[y].isSelected = false;
      this.checkArray.forEach((item) => {
        if (item === e.target.value) {
          this.checkArray.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkArray);
    this.isAllSelected();
  }
  onCheckboxChangeAll(e) {
    if (e.target.checked) {
     this.all = true;
     this.checkAll();
       } else {
      this.all = false;
      this.unCheckAll();
    }

  }

  isAllSelected() {
    this.all = this.STUDS.every(function(item: any) {
      return item.isSelected === true;
    });
  }

  checkAll() {
    this.unCheckAll();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.STUDS.length; i++) {
      this.STUDS[i].isSelected = this.all;
      this.checkArray.push(this.STUDS[i].id);
    }
    console.log(this.checkArray);
  }
  unCheckAll() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.STUDS.length; i++) {
      this.STUDS[i].isSelected = this.all;
      this.checkArray = [];
    }
    console.log(this.checkArray);
  }
 async push() {
    this.mloading = true;
    for (let i = 0; i < this.STUDS.length; i++) {
     if (this.STUDS[i].isSelected) {
        await this.addSTP(this.STUDS[i],  i);
      }
    }
    this.mloading = false;
 }

}
