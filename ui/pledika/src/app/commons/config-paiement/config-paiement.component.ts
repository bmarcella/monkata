import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-config-paiement',
  templateUrl: './config-paiement.component.html',
  styleUrls: ['./config-paiement.component.css']
})
export class ConfigPaiementComponent implements OnInit {
  vpos: any;
  ever: any;

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

  opt = { code: '', name: '', option: '', actived: true};


eoption = false;

  verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse:"",actived:true,pos:""};
  everse:any;

  ngOnInit() {
    this.getOptions();
  }

 setOption(o: any) {
   this.coption = o;
   this.co = null;
   this.verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse: "", actived: true,pos:"" };
   this.everse=false;
   this.ever={};
   this.verses = [];
   this.getVerse(o._links.copaie.href);
 }

  setAdmis(c) {
   if (c == 0) { return; }
   const url = `${environment.apiUrl}options/${this.coption.code}`;
   this.app.editData(url, { montant_admis: c})
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 1;
          this.response.message = 'Montant admission modifier avec succès';

        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 1;
          this.response.message = error;
        }
      );
  }

  getOptions() {
    const url = `${environment.apiUrl}options`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {

          this.options = data._embedded.options;
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
          this.copaie = data._embedded.cycleOPaies;
        },
        error => {
        }
      );
  }

  setCopaie(o: any) {
    this.co = o;
    this.getPaie(o._links.cversement.href);
  }

  getPaie(url) {
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.verses = data._embedded.cycleVersements;
        },
        error => {
        }
      );
  }

editOptionToggle(data, i) {
  this.eoption = data;
  this.eopt = data;
  this.pos = i;
  this.verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse: "", actived: true,pos:"" };
  this.everse=false;
}


addOpt(c) {
  if (c.name === '' || c.code === '') { return; }
  const url = `${environment.apiUrl}cycleOPaies`;
  c.option = `${environment.apiUrl}options/${this.coption.code}`;
  const DATA = c;
  this.app.setData(url, DATA)
    .pipe(first())
    .subscribe(
      data => {
        this.copaie.push(data);
        this.loading = false;
        this.response.active = true;
        this.response.state = 'success';
        this.response.view = 2;
        this.response.message = 'Option a été ajouté avec succès';
        this.opt = { code: '', name: '', option: '', actived: true};
      },
      error => {
        this.loading = false;
        this.response.active = true;
        this.response.state = 'danger';
        this.response.view = 2;
        this.response.message = error;
      }
    );


}
  editOpt(c) {
    if (c.name === '') { return; }
    const url = `${environment.apiUrl}cycleOPaies/${c.id}`;
    const DATA = {
      name: c.name
    } ;
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.copaie[this.pos] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 2;
          this.response.message = 'Option a été modifié avec succès';
          this.editOptionToggle(false, -1);
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 2;
          this.response.message = error;
        }
      );


  }

  toggleOpt(c, i, a) {
    const url = `${environment.apiUrl}cycleOPaies/${a.id}`;
    const DATA = {
      actived: c
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.copaie[i] = data;
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 2;
          this.response.message = 'Option a été modifié avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 2;
          this.response.message = error;
        }
      );


  }
  delOpt(c, i) {
    const url = `${environment.apiUrl}cycleOPaies/${c.id}`;
    this.app.delData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.copaie.splice(i, 1);
          this.loading = false;
          this.response.active = true;
          this.response.state = 'success';
          this.response.view = 2;
          this.response.message = 'Option a été supprimé avec succès';
        },
        error => {
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.view = 2;
          this.response.message = error;
        }
      );


  }

  toggleVerse(c, i, a) {
    const url = `${environment.apiUrl}cycleVersements/${a.id}`;
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
    if (c.name === '' || c.code === '' || c.montant<=0) { return; }
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
          this.verse = { code: '', name: '', montant: '', jour_limit: '', mois_limit: '', copaie: 0, type_verse: "", actived: true,pos:"" };
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
    const url = `${environment.apiUrl}cycleVersements/${c.id}`;
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
    const url = `${environment.apiUrl}cycleVersements/${c.id}`;
    const DATA = {
      name: c.name,
      montant:c.montant,
      jour_limit:c.jour_limit,
      mois_limit:c.mois_limit,
      pos:c.pos,
      type_verse : c.type_verse
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
