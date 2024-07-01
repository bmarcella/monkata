import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { envQNote } from 'src/environments/environment.prod';
import { BaseApp } from '../BaseApp';
import { Period } from '../models/Period';
import { Acad } from '../models/Gen/Acad';
import { BulletinGen } from '../models/Gen/BulletinGen';
import { PeriodGen } from '../models/Gen/PeriodGen';
import { ResultsGen } from '../models/Gen/ResultsGen';

@Component({
  selector: 'app-bulletin-gen-2',
  templateUrl: './bulletin-gen.component.html',
  styleUrls: ['./bulletin-gen.component.css']
})
export class BulletinGenComponent extends BaseApp  implements OnInit {

  CUSER: any;
  token: any;
  period: Acad;
  resMode=0;
  public tools = true;
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private formBuilder: UntypedFormBuilder,
    private auth: AuthenticationService,
    private formBuilder2: UntypedFormBuilder) {
    super();
    this.CUSER = this.auth.currentUserValueX;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
 }


  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
    this.getBGByToken();
  }
  getBGByToken() {
      this.app.getData(`${envQNote.endpoint}BO/@BulletinGen/getBGByToken/${this.token}`)
        .pipe(first())
        .subscribe(
          data => {
           //  console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                 this.formatDataFromServer(data.body.data.DATA) ;
              }
            }
          }, error => {
            console.log(error);
          }
      );
  }

  formatDataFromServer(data: any) {
    if (data.data_bgen != null) {
       this.period = data.data_bgen;
     } else {
      this.setPeriod(data);
    }
  }
  blt: BulletinGen[] = [];
  setPeriod(data: any) {

    let p = data.bulletins[0];
    let etab = p.data.etab;
    this.period = new Acad(p.annee, p.name_bgen, p.classe);
    this.period.setEtab(etab);
    this.period.token_bgen = this.token;
    /**  */
    let bulletins: BulletinGen[] = [];
    let pgs: PeriodGen[] = [];
    for (let i = 0; i < data.bulletins.length; i++) {
      let pg = new PeriodGen(data.bulletins[i].periode);
          pg.total_note = data.bulletins[i].data.coef;
          pg.moy_classe = data.bulletins[i].data.moy_classe;
          this.period.moy_classe_gen += pg.moy_classe;
          pgs.push(pg);
    }

    this.period.moy_classe_gen = this.period.moy_classe_gen / pgs.length

    for (let j = 0; j < p.data.users.length; j++) {
      let code = p.classe + "_" + p.annee + "_" + p.data.users[j].code;
      let bg = new BulletinGen(code, p.data.users[j]);
      let results: ResultsGen[] = [];
       for (let k = 0; k < p.data.cours.length; k++) {
             let crg_1 = p.data.cours[k].code;
             let crg   = code + "_" + crg_1;
             let rs = new ResultsGen(crg, p.data.cours[k]);
             if (p.data.cours[k].is_calc) {
               bg.coef += p.data.cours[k].note_total;
             }
             results.push(rs);
        }
      bg.results = results;
      bulletins.push(bg);
    }
    this.blt = bulletins;

    for (let i = 0; i < this.blt.length;i++) {
         for (let j = 0; j < this.blt[i].results.length;j++) {
           this.addNote(i, j, data);
         }
    }
     for (let i = 0; i < this.blt.length;i++) {
         for (let j = 0; j < this.blt[i].results.length;j++) {
              this.blt[i].results[j].setNotTotal();
         }
     }


    this.period.periods = pgs;
    this.setNoteTotalParPeriod(pgs);
    this.period.bulletins = this.blt;
    console.log(this.period);
  }
  setNoteTotalParPeriod(pgs) {

    for (let f = 0; f < pgs.length; f++) {
      for (let i = 0; i < this.blt.length; i++) {
         let ntp = 0;
         for (let j = 0; j < this.blt[i].results.length;j++) {
              ntp += this.blt[i].results[j].note[f];
         }
        this.blt[i].total_note_period[f] = ntp;
        this.blt[i].total_note += ntp;
       }
    }

    for (let i = 0; i < this.blt.length; i++) {
    }
  }
  addNote(p: number, m: number, data: any) {
       let bt = data.bulletins;
      for (let i = 0; i < bt.length; i++) {
        for (let j = 0; j < bt[i].data.bulletins.length; j++) {
          if (this.blt[p].user.code == bt[i].data.bulletins[j].user.code) {
            for (let k = 0; k < bt[i].data.bulletins[j].results.length; k++) {

               if (this.blt[p].results[m].cours.code == bt[i].data.bulletins[j].results[k].cours.code) {
                  let note = parseFloat( bt[i].data.bulletins[j].results[k].note);
                  this.blt[p].results[m].note.push(note);
                  if (this.blt[p].results[m].cours.is_number) {
                    this.blt[p].results[m].note_total += note;
                  }

                }

               }
          }
         }
      }
  }

  saveBulletin() {
    const json = JSON.stringify(this.period);
    // tslint:disable-next-line:max-line-length
    const data: FormData = new FormData();
    data.append('periode', json);
    this.app.setData(`${envQNote.endpoint}BO/@BulletinGen/save/${this.token}`, data)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          console.log(data);
          if (!data.crash) {
            if (!data.body.data.ERROR) {
              const dataj = JSON.stringify(this.period);
              sessionStorage.setItem('PERIOD_GEN_DATA', dataj);
            } else {
               alert('Erreur Serveur ');
            }
          } else {
              alert('Erreur Serveur ');
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  reset() {
    this.loading[0] = true;
     this.app.getData(`${envQNote.endpoint}BO/@BulletinGen/getBGByToken/${this.token}`)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                 this.setPeriod(data.body.data.DATA);
              }
            }
            this.loading[0] = false;
          }, error => {
            console.log(error);
            this.loading[0] = false;
          }
      );
  }


}
