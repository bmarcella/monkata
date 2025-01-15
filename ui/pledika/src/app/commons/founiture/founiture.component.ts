import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { SalleService } from 'src/app/_Services/salle.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-founiture',
  templateUrl: './founiture.component.html',
  styleUrls: ['./founiture.component.css'],
})
export class FounitureComponent implements OnInit {
  loading;
  salles: any;
  es: any ;
  s: any = {
    id:0,
    name: '',
    type_fn: '',
    sell_at: false,
    description: '',
    unity: '',
  };
  submitted = false;
  success = '';
  cindex = null;
  response = { state: '', message: '', active: false };
  ldata = true;
  constructor(public nServ: SalleService, public app: AppService) {}

  ngOnInit() {
    this.getSalle();
  }
  editSalle(salle, i) {
    this.es = salle;
    this.cindex = i;
  }
  closeEditSalle() {
    this.es = null;
    this.cindex = null;
  }
  delSalle(obj, i) {
    if (
      confirm(
        'Voulez-vous vraiment supprimer (' +
          obj.name +
          ' ' +
          obj.code +
          ') '
      )
    ) {
 const url = `${environment.apiUrl}fournitures/${obj.id}`;
 this.app
        .delData(url)
        .pipe(first())
        .subscribe(
          (data) => {
            this.salles.splice(i, 1);
            this.response.active = true;
            this.response.state = 'success';
            this.response.message = `${obj.name} supprimé(e).`;
            this.closeEditSalle();
          },
          (error) => {
            this.salles.splice(i, 1);
            this.response.active = true;
            this.response.state = 'danger';
            this.response.message = error;
          }
        );
    }
  }

  getSalle() {
    const url = `${environment.apiUrl}fournitures?size=1000`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.salles = data._embedded.fournitures;
          this.ldata = false;
          console.log(data);  
       },
        (error) => {
          return [];
          this.ldata = false;
        }
      );
  }

  editSubmitSalle() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const $POST = this.es;

    const url = `${environment.apiUrl}fournitures/${this.es.id}`;

    this.app
      .editData(url, $POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (data != null) {
            this.response.state = 'success';
            this.response.message = 'Modification affectuée avec succes';
             this.salles[this.cindex] = data;
            this.closeEditSalle(); 
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );
  }

  addSalle() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const $POST = this.s;
    const url = `${environment.apiUrl}fournitures`;
    this.app
      .setData(url, $POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (data != null) {
            this.response.state = 'success';
            this.response.message = 'Insertion affectuée avec succes';
            this.s = {
                id: '',
                name: '',
                type_fn: '',
                sell_at: false,
                description: '',
                unity: '',
              };
            this.salles.push(data);
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );
  }
}
