import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  // IMEI : 353328076746518
  loading: any;
  mat : any = { coef: '', name: '', note_total:'' };
  response = { state: '', message: '', active: false };
  submitted = false;
  mats=[];
  cmat: any;
  pos: any;
  constructor(public nServ: AppService) {
  }

  ngOnInit() {
    this.getMat();
  }
  getMat() {
    const url = `${environment.apiUrl}matieres`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        data => {
            this.mats = data._embedded.matieres;
        },
        error => {
        }
      );
  }

 del(a, i){
   const url = `${environment.apiUrl}matieres/${a.id}`;
   this.nServ.delData(url).pipe(first())
     .subscribe(
       data => {
         this.mats.splice(i, 1);
       },
       error => {
       }
     );
 }
  addMat() {
    if (this.loading) { return; }
    this.loading = true;
    const $POST = {
      name: this.mat.name,
      coef: this.mat.coef,
      note_total: this.mat.note_total,
    };
    const url = `${environment.apiUrl}matieres`;
    this.nServ.setData(url, $POST).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.response.active = true;
          if (data != null) {
            this.response.state = 'success';
            this.response.message = 'Insertion affectuée avec succes';
            this.mat = { coef: '', name: '', note_total: '' };
            this.mats.push(data);
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

}
