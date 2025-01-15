import { DomService } from './../../_Services/dom.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css'],
})
export class DomaineComponent implements OnInit {
  doms: Observable<any>;
  opts: Observable<any>;
  acs: any;
  villes: Observable<any>;
  salles: Observable<any>;
  vacs: Observable<any>;
  promo: any = { ac: '' };
  loading = false;
  cloading = false;
  dloading = false;
  vloading = false;
  addForm: UntypedFormGroup;
  submitted = false;
  success = '';
  nivs: any;
  response = { state: '', message: '', active: false };
  vresponse = [];
  config = { prev: '', next: '' };
  docs: any;
  ldocs: any = [];
  verse: any = [];
  dverse =  [];
  sverse = [];
  etab: any;
  render = false;
  isData = false;
  af: any;
  profs=[];
  cprof :any;
  constructor(public nServ: AppService, private domServ: DomService) {}
  // tslint:disable-next-line:use-lifecycle-interface

  // When change detection has finished:
  // child components created, all *ngIfs evaluated
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    if (this.isData) {
      // console.log(1);
      this.render = true;
    } else {
      // console.log(0);
    }
  }


  ngOnInit() {
    this.getDomaine();
    this.getContext();
    this.getSalle();
    this.getVacation();
    this.getNiveau();
    // tslint:disable-next-line:no-unused-expression
    this.getAC();
    this.getEtabInfo();
    this.getAF();
    this.getProf();
  }

 getProf() {
    const url = `${environment.apiUrl}getProfByRole`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.profs = data.data.users;
          console.log(data);
        },
        (error) => {}
      );
  }

setTut(cprof, ido) {
    const POST = {
      id_resp:cprof,
    };
    const url = `${environment.apiUrl}promotions/${ido}`;
    this.nServ
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {},
        () => {}
      );
  }

  getEtabInfo() {
    this.nServ
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }
  setNextPrev(e) {
    this.doms[e.id].option[e.io].niveau[e.in].prev = e.bdata.prev;
    this.doms[e.id].option[e.io].niveau[e.in].next = e.bdata.next;
  }
  addNewNR(e) {
    this.doms[e.id].option[e.io].niveau[e.in].niveau_rel.push(e.data);
  }
  addNewPM(e) {
    this.doms[e.id].option[e.io].niveau[e.in].niveau_rel[e.inr].promotion.push(
      e.data
    );
  }

  setDoc(e) {
    this.doms[e.id].option[e.io].niveau[e.in].niv_doc.push(e.data);
  }

  getDomaine() {
    this.domServ
      .getDom()
      .pipe(first())
      .subscribe(
        (data) => {
          this.setVerse(data.data);
          this.doms = data.data;
          console.log(data);
          this.isData = true;
          this.render = true;
        },
        (error) => {}
      );
  }

  getAC() {
    this.nServ
      .getData(`${environment.apiUrl}promo_afs`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.acs = data._embedded.promo_afs;
        },
        (error) => {}
      );
  }
  getVacation() {
    this.nServ
      .getData(`${environment.apiUrl}vacations`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.vacs = data._embedded.vacations;
        },
        (error) => {}
      );
  }
  getSalle() {
    this.nServ
      .getData(`${environment.apiUrl}salles?size=100`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.salles = data._embedded.salles;
        },
        (error) => {}
      );
  }

  getContext() {
    this.nServ
      .getData(`${environment.apiUrl}context`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.villes = data.data.vis;
          this.docs = data.data.nivs;
        },
        (error) => {}
      );
  }

  editAM(o, ido, id, io) {
    this.nServ
      .editData(`${environment.apiUrl}options/${ido}`, { montant_admis: o })
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.doms[id].option[io].montant_admis = o;
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'success';
          this.vresponse[id].message = 'Modification effectuée avec succès';
          this.vloading = false;
        },
        (error) => {
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'danger';
          this.vresponse[id].message = error;
          this.vloading = false;
        }
      );
  }

  editAMC(o, ido, id,io,ni) {
    this.nServ
      .editData(`${environment.apiUrl}niveaus/${ido}`, { montant_admis_classe: o })
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.doms[id].option[io].niveau[ni].montant_admis_classe = o;
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'success';
          this.vresponse[id].message = 'Modification effectuée avec succès';
          this.vloading = false;
        },
        (error) => {
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'danger';
          this.vresponse[id].message = error;
          this.vloading = false;
        }
      );
  }

getNiveau() {
    this.nServ
      .getData(`${environment.apiUrl}niveaus`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.nivs = data._embedded.niveaus;
        },
        (error) => {}
      );
  }

getOneAC(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.acs.length; i++) {
      // tslint:disable-next-line:radix
      if (parseInt(id) === parseInt(this.acs[i].id)) {
        return this.acs[i];
      }
    }
    return null;
  }
getAF() {
    const url = `${environment.apiUrl}getAf`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.af = data.data;

        },
        (error) => {}
      );
  }
addPromo(nr, io, id, inn, inr, code, ocode, rep) {
    if (!this.promo.ac) {
      return;
    }
    const a = this.getOneAC(this.promo.ac);
    const scode =
      a.date_debut.split('T')[0].split('-')[0] +
      '-' +
      a.date_fin.split('T')[0].split('-')[0];
    const data = {
      // tslint:disable-next-line:max-line-length
      code_cycle: ocode,
      code_niveau: code,
      code: nr.name + '-' + scode,
      niveau_rel: `${environment.apiUrl}niveau_rels/${nr.id}`,
      promo_af: `${environment.apiUrl}promo_afs/${this.promo.ac}`,
      moy_total: this.af.moy_total,
      moy_accept: this.af.moy_accept,
      moy_reprise: this.af.moy_reprise,
      moy_exc: this.af.moy_exc,
      prog_id: nr.prog_id,
      reprise: rep,
      max_student: 50,
    };
    const url = `${environment.apiUrl}promotions`;
    this.nServ
      .setData(url, data)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (data) {
            this.response.state = 'success';
            this.response.message = '';
            data.promo_af = a;
            this.addNewPM({ data, io, id, in: inn, inr });
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
updateNiv(niv, config, id, io, inn) {
    this.cloading = true;
    const url = `${environment.apiUrl}niveaus/${niv.code}`;
    const bdata = {
      prev: config.prev,
      next: config.next,
    };
    this.nServ
      .editData(url, bdata)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.cloading = false;
          this.response.active = true;
          if (data) {
            this.response.state = 'success';
            this.response.message = '';
            this.setNextPrev({ bdata, io, id, in: inn });
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.cloading = false;
          console.log(error);
        }
      );
  }

updateNivDoc(niv, docs, id, io, inn) {
    this.dloading = true;
    const niveau = `${environment.apiUrl}niveaus/${niv.code}`;
    const url = `${environment.apiUrl}niv_docs`;
    console.log(docs);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.docs.length; i++) {
      if (docs[i]) {
        const bdata = {
          document: `${environment.apiUrl}documents/${this.docs[i].code}`,
          niveau,
        };
        this.nServ
          .setData(url, bdata)
          .pipe(first())
          .subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (data) => {
              this.dloading = false;
              this.response.active = true;
              if (data) {
                this.response.state = 'success';
                this.response.message = '';
                this.setDoc({ data, io, id, in: inn });
              } else {
                this.response.state = 'danger';
                this.response.message = data.message;
              }
            },
            (error) => {
              this.response.active = true;
              this.response.state = 'danger';
              this.response.message = error;
              this.dloading = false;
              console.log(error);
            }
          );
      }
    }
  }
nverse =[];
mverse =[];
setVerse(data) {
    data.forEach((o) => {
      this.vresponse.push({ state: '', message: '', active: false });
      o.option.forEach((frag) => {
        // tslint:disable-next-line:no-unused-expression
        this.verse.push(false);
        frag.niveau.forEach((niv) => {
           this.nverse.push(false)
        });
        this.mverse.push(this.nverse);
        this.nverse= [];
      });
      this.dverse.push(this.verse);
      this.sverse.push(this.mverse);
      this.verse = [];
    });
  }
updateVersement(v, id, io, iop, ivp) {
    this.vloading = true;
    const url = `${environment.apiUrl}cycleVersements/${v.id}`;
    const bdata = {
      montant: v.montant,
    };
    this.nServ
      .editData(url, bdata)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.vloading = false;
          this.vresponse[id].active = true;
          if (data) {
            this.vresponse[id].state = 'success';
            this.vresponse[id].message = 'Versement ' + v.name + ' modifié';
            // this.setNextPrev({ bdata, io, id, in: inn });
          } else {
            this.vresponse[id].state = 'danger';
            this.vresponse[id].message =
              'Versement ' + v.name + ' non  modifié';
          }
        },
        (error) => {
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'danger';
          this.vresponse[id].message = error;
          this.vloading = false;
          console.log(error);
        }
      );
  }

updateVersementClasse(v, id, io, iop, ivp, ni) {
    this.vloading = true;
    const url = `${environment.apiUrl}classeVersements/${v.code}`;
    const bdata = {
      montant: v.montant,
    };
    this.nServ
      .editData(url, bdata)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.vloading = false;
          this.vresponse[id].active = true;
          if (data) {
            this.vresponse[id].state = 'success';
            this.vresponse[id].message = 'Versement ' + v.name + ' modifié';
            // this.setNextPrev({ bdata, io, id, in: inn });
          } else {
            this.vresponse[id].state = 'danger';
            this.vresponse[id].message =
              'Versement ' + v.name + ' non  modifié';
          }
        },
        (error) => {
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'danger';
          this.vresponse[id].message = error;
          this.vloading = false;
        }
      );
  }


delVersementClasse(v, id, io, iop, ivp, ni) {
    this.vloading = true;
    const url = `${environment.apiUrl}classeVersements/${v.code}`;

    this.nServ
      .delData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.vloading = false;
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'success';
          this.vresponse[id].message = 'Versement ' + v.name + ' supprimé';
          this.doms[id].option[io].niveau[ni].copaie[iop].cversement.splice(ivp,1);
        },
        (error) => {
          this.vresponse[id].active = true;
          this.vresponse[id].state = 'danger';
          this.vresponse[id].message = error;
          this.vloading = false;
        }
      );
  }

toggleDiv(d, s, id, io, i, t) {
    const url = `${environment.apiUrl}niveaus/${d.code}`;
    this.nServ
      .editData(url, s)
      .pipe(first())
      .subscribe(
        (data) => {
          this.doms[id].option[io].niveau[i].reprise = t;
        },
        (error) => {}
      );
  }

toggleDivEE(d, s, id, io, i, t) {
    const url = `${environment.apiUrl}niveaus/${d.code}`;
    this.nServ
      .editData(url, s)
      .pipe(first())
      .subscribe(
        (data) => {
          this.doms[id].option[io].niveau[i].examen_etat = t;
        },
        (error) => {}
      );
  }

toggleRDiv(d, s, id, io, i, ir, t) {
    const url = `${environment.apiUrl}niveau_rels/${d.id}`;
    this.nServ
      .editData(url, s)
      .pipe(first())
      .subscribe(
        (data) => {
          this.doms[id].option[io].niveau[i].niveau_rel[ir].reprise = t;
        },
        (error) => {}
      );
  }

initPaiement(code,i,io,id) {
    this.nServ
      .getData(`${environment.apiUrl}initPaiementByClasse/${code}`)
      .pipe(first())
      .subscribe(
        (data) => {
           if (!data.crash) {
            this.setVersement(data.data, i, io, id);
           }
        },
        (error) => {}
      );
  }

 setVersement(data, i, io, id) {
    console.log(data);
    this.doms[id].option[io].niveau[i].copaie = data;
  }
}
