import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-config-student-paiement',
  templateUrl: './config-student-paiement.component.html',
  styleUrls: ['./config-student-paiement.component.css']
})
export class ConfigStudentPaiementComponent implements OnInit {

  vpos: any;
  ever: any;
  ID: any;
  IDP: any;
  cn: any;
  cverses: any;
  cverse:any;
  constructor(private route: ActivatedRoute, private app: AppService) { }
  eopt: any;
  pos: any;
  verses: any;
  options: any;
  coption: any;
  response = { state: '', message: '', active: false, view: 0 };
  loading: boolean;
  pverse: any;
  copaie: any;
  co: any;
  eoption = false;
  verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse: "", actived: true, pos: "" };
  everse: any;

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.IDP = this.route.snapshot.params.idp;
    this.getOptions();
  }
    change(){
    }

  setOption(o: any) {
    this.coption = o;
    this.verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse: "", actived: true, pos: "" };
    this.everse = false;
    this.ever = {};
    this.verses = [];
    this.getVerse(o._links.pversement.href);
    this.getCN(o.option_paiement);
  }
  getOptions() {
    const url = `${environment.apiUrl}parcourses/${this.ID}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.setOption(data);
        },
        error => {
        }
      );
  }

  getCN(code) {
    const url = `${environment.apiUrl}cycleOPaies/${code}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.cn= data;
          this.getCVerse(data._links.cversement.href);
        },
        error => {
        }
      );
  }

  getCVerse(url) {
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.cverses = data._embedded.cycleVersements;
        },
        error => {
        }
      );
  }
  getVerse(url) {
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.verses = data._embedded.pVersements;
        },
        error => {
        }
      );
  }


  toggleVerse(c, i, a) {
    const url = `${environment.apiUrl}pversements/${a.id}`;
    const DATA = {
      actived: c
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.verses[i] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 3;
          this.response.message = 'Versement a été modifié avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 3;
          this.response.message = error;
        }
      );


  }
  addVerse(c) {
    if (c.name === '' || c.code === '' || c.montant <= 0) { return; }
    const url = `${environment.apiUrl}cycleVersements`;
    c.copaie = `${environment.apiUrl}cycleOPaies/${this.co.id}`;
    const DATA = c;
    this.app.setData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.verses.push(data);
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 3;
          this.response.message = 'Versement a été ajouté avec succès';
          this.verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse: "", actived: true, pos: "" };
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 3;
          this.response.message = error;
        }
      );


  }

  editVerseToggle(data, i) {
    this.everse = data;
    this.ever = data;
    this.vpos = i;
  }

  delVerse(c, i) {
    const url = `${environment.apiUrl}pversements/${c.id}`;
    this.app.delData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.verses.splice(i, 1);
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 3;
          this.response.message = 'Versement a été supprimé avec succès';
          this.editVerseToggle(false, -1);
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 3;
          this.response.message = error;
        }
      );
  }

  editVerse(c) {
    if (c.name === '') { return; }
    const url = `${environment.apiUrl}pversements/${c.id}`;
    const DATA = {
      name: c.name,
      montant: c.montant,
      jour_limit: c.jour_limit,
      mois_limit: c.mois_limit,
      pos: c.pos,
      type_verse: c.type_verse
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.verses[this.vpos] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 3;
          this.response.message = 'Versement a été modifié avec succès';
          this.editVerseToggle(false, -1);
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 3;
          this.response.message = error;
        }
      );


  }

}
