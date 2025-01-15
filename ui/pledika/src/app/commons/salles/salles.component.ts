import { Component, OnInit } from '@angular/core';
import { SalleService } from 'src/app/_Services/salle.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {
  loading;
  salles: any;
  es: any;
  s: any = { code: '', name: '', type_salle: 'Salle', index: 1, end: 1};
  submitted = false;
  success = '';
  cindex = null;
  response = { state: '', message: '', active: false };
  constructor(public nServ: SalleService) {
  }

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
 if (confirm('Voulez-vous vraiment supprimer (' + obj.type_salle + ' ' + obj.code + ') ')) {
   this.nServ.delSalle(obj.code)
      .pipe(first())
      .subscribe(data => {
          this.salles.splice(i, 1);
          this.response.active = true;
          this.response.state = 'success';
          this.response.message = `Espace ${obj.code} supprimé.`;
      }, error => {
          this.salles.splice(i, 1);
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = `Espace ${obj.code} non supprimé.`;
      });
    }
  }

  getSalle() {
   this.nServ.getSalle()
      .pipe(first())
      .subscribe(data => {
        this.salles = data._embedded.salles;
      }, error => {
        return [];
      });
  }


  editSubmitSalle() {
  if  (this.loading) { return; }
  this.loading = true;
  const $POST = {
     code: this.es.code,
     name: this.es.name,
     type_salle: this.es.type_salle,
   };

  this.nServ.addSalle($POST).pipe(first())
     .subscribe(
       data => {
         this.loading = false;
         this.response.active = true;
         if (data != null) {
          this.response.state = 'success';
          this.response.message = 'Modification affectuée avec succes';
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

  addSalle(s: any) {

  const $POST = {
     code: s.code,
     name: s.name,
     type_salle: s.type_salle,
   };
  this.nServ.addSalle($POST).pipe(first())
     .subscribe(
       data => {
         this.response.active = true;
         if (data != null) {
          this.response.state = 'success';
          this.response.message = 'Insertion affectuée avec succes';
          this.s = { code: '', name: '', type_salle: 'Salle' };
          this.salles.push(data);
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
         }
       },
       error => {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = error;

       }
     );
 }

async addNewSalle() {
    if (this.s.index <= this.s.end) {
const qt = this.s.end - this.s.index ;
if (qt <= 100 ) {
   if  (this.loading) { return; }
   this.loading = true;
   for (let i = this.s.index; i <= this.s.end; i++) {
          const ns = { code: this.s.code, name: this.s.name, type_salle: this.s.type_sale};
          ns.code += '_' + i;
          await this.addSalle(ns);
      }
    this.loading = false;
    } else {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = this.s.end + '-' + this.s.index + '=' + qt + ', La difference doit être inferieur a 100';
         this.loading = false;
   }
    } else {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = 'Le nombre de salles que vous voulez generer est incorrect.';
         this.loading = false;
   }
 }

}
