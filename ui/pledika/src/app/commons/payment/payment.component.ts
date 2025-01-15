import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private app: AppService) { }
  PROMO: any;
  OP: any;
  option: any;
  ID: any;
  parcours: any;
  verses: any;
  loading;
  conf = false;
  montant;
  montant_2;
  id_pay;
  remain;
  cverse = 0;
  tp = 0;
  serie = '';

  response = { state: '', message: '', active: false };
  tv = [];
  edit = [];
  pos = [];
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getParcours() ;
    // this.delVerse(744,-1);
  }

  getParcours() {
    this.app.getData(`${environment.apiUrl}parcourses/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.parcours = data;
          this.getVerse(data._links.pversement);
          this.getPromo(data._links.promotion);
          console.log(data);
        },
        () => {
        }
      );

  }

 getPromo(url) {
    this.app.getData(url.href)
      .pipe(first())
      .subscribe(
        data => {
          this.PROMO = data;
          this.getOP();
        },
        () => {
        }
      );

  }

 getOP() {
    this.app
      .getData(
        `${environment.apiUrl}getOptionPaiement?code=${this.PROMO.code_cycle}`
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.OP = data.data;
          // console.log(data);
        },
        (error) => {}
      );
  }


initVerse(o) {
    if (this.loading) {
      return;
    }
    this.loading = true;

    const data = {
      id_opaie: o,
      id_student: this.ID,
      id_promo: this.PROMO.id,
    };

    const url = `${environment.apiUrl}initPversement`;
    this.app
      .setData(url, data)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.verses.push(...data.data);
            this.response.state = 'success';
            this.response.message = data.message;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
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


  getVerse(url) {
    this.app.getData(url.href)
      .pipe(first())
      .subscribe(
        data => {
          this.verses = data._embedded.pVersements;
          console.log(this.verses);
        },
        () => {
        }
      );

  }

 check(state) {
   this.response.active = false;
   const sold = this.montant;
   if (sold > 1) {
    this.conf = state;
   } else {
     this.response.active = true;
     this.response.state = 'danger';
     this.response.message = 'Le montant doit etre superieur a 1G';
   }
 }
  pay() {
    this.response.active = false;
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: triple-equals
    if (this.tp === 0 || (this.tp !== 0 && this.serie !== '')) {
    if (this.montant === this.montant_2) {
    if (this.loading) { return; }
    this.loading = true;
    const sold = this.montant;
    if (sold > 500) {
    this.id_pay = undefined;
    this.remain = undefined;
    if (this.tp === 0) { this.serie = '0'; }
    const url = `${environment.apiUrl}payment/${this.ID}/${sold}/${this.cverse}/${this.tp}/${this.serie}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
        console.log(data);
        this.loading = false;
        this.check(false);
        this.response.active = true;
        this.response.message = data.message;
        if (!data.crash) {
          this.verses = data.data.pv;
          this.id_pay = data.data.id_payment;
          this.response.state = 'success';
          this.remain = data.data.remain;
          this.montant = '';
         } else {
          this.response.state = 'danger';
          }
        },
        (e) => {
          this.check(false);
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = e;
        }
      );
   } else {
      this.response.active = true;
      this.response.state = 'danger';
      this.response.message = 'Le montant doit etre superieur a 500G';
   }
   } else {
     this.response.active = true;
     this.response.state = 'danger';
     this.response.message = 'Les montants ne sont pas identiques';
   }
 } else {
     this.response.active = true;
     this.response.state = 'danger';
     this.response.message = 'Vous devez entrer le code de transaction';
   }

  }
  editVerse(id, tv, i) {
    const url = `${environment.apiUrl}pVersements/${id}`;
    const DATA = {
      type_verse : tv
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.verses[i] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.message = 'Versement a été modifié avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

 delVerse(id, i) {
 if (!confirm('Voulez-vous vraiment supprimer cet versement?')) {return; }
 const url = `${environment.apiUrl}delVerse/${id}`;
 this.app.delData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.verses.splice(i, 1);
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.message = 'Versement a été supprimé avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

 editVerseAct(id, tv, i) {
    const url = `${environment.apiUrl}pVersements/${id}`;
    const DATA = {
      actived : tv
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.verses[i] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.message = 'Versement a été modifié avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }
editVersePos(id, tv, i) {
    const url = `${environment.apiUrl}pVersements/${id}`;
    const DATA = {
      pos : tv
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.verses[i] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.message = 'Versement a été modifié avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

}
