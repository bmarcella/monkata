import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reprise-manager',
  templateUrl: './reprise-manager.component.html',
  styleUrls: ['./reprise-manager.component.css']
})
export class RepriseManagerComponent implements OnInit {
  constructor(public studServ: StudentsService, private route: ActivatedRoute, private app: AppService) { }
  mloading: boolean;
  apromo: any;
  cpromo: any;
  over: boolean;
  tpromo: any;
  ispLoad: boolean;
  PHSTUDS: any;
  PSTUDS: any;
  ID: any;
  IDF: any;
  PROMO: any;
  MPROMO: any;
  OP: any;
  option = [];
  response = { state: '', message: '', active: false };
  STUDS = [];
  loading = [];
  frag: any;
  HSTUDS: any[];
  iloading: boolean;
  msg = [];
  frags = [];
dloading = [];

 moption;
 DL = [];

  ngOnInit() {
     this.getPromo();
  }

init() {
  this.getFrags();
  this.getParcours();
}

 changeAll() {
   this.frag = undefined;
   this.IDF = null;
   this.getPS();
  }
  changePage(f) {
   this.frag = f;
   this.IDF = f.id;
   this.init();
  }

  getPromo() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.over = true;
         // console.log(data);
          if (!data.crash) {
            this.apromo = data.data;
            this.tpromo = this.apromo.length;
          }
        },
        (error) => {
        }
      );
  }

  getPS() {
    const url = `${environment.apiUrl}getDecisionFinale/${this.cpromo.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PSTUDS = data.data;
          this.PHSTUDS = this.PSTUDS;
          this.ispLoad = true;
         // console.log(data);
        },
        (error) => { this.ispLoad = true; }
      );
  }

  close() {
    if (this.mloading) {
      return;
    }
    this.mloading = true;
    this.app
      .getData(`${environment.apiUrl}closeByPromo/${this.cpromo.id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.mloading = false;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
            this.closeAll();
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.mloading = false;
         }
      );
  }

closeAll() {
  for (let i = 0; i < this.PSTUDS.length; i++) {
   this.PSTUDS[i].actived = false;
  }
  this.HSTUDS = this.STUDS;
}
getCPromo() {
  this.frags = [];
  this.frag = undefined;
  this.ID =  this.cpromo.id;
 // console.log(this.cpromo);
  const url = `${environment.apiUrl}promotions/${this.ID}/promofrag`;
  this.getFrag(url);
  this.getOP();
}
  getFrag(url) {
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.frags = data._embedded.promoFrags;
          this.getPS();
        },
        error => {
        }
      );
  }

  getFrags() {
    this.app.getData(`${environment.apiUrl}promoFrags/${this.IDF}`)
      .pipe(first())
      .subscribe(
        data => {
          this.frag = data;
        },
        error => {
        }
      );
  }

  getParcours() {
    if (this.iloading) { return; }
    this.iloading = true;
    const url = `${environment.apiUrl}getAllParcoursByPromo/${this.IDF}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.iloading = false;
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        error => {
          this.iloading = false;
        }
      );
  }
  onKey(e: { target: { value: any; }; }) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
        this.STUDS = this.filterItems(query);

     } else {

      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm: string) {
    return this.STUDS.filter(item => {
      return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  initResults() {
    if (this.iloading) { return; }
    this.iloading = true;
    this.app.getData(`${environment.apiUrl}addStudentToPromoFrag/${this.IDF}/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.iloading = false;
          this.app.getData(`${environment.apiUrl}getPars_cours/${this.IDF}`)
            .pipe(first())
            .subscribe(
              res => {
                this.iloading = false;
                this.STUDS = res.data;
                this.HSTUDS = this.STUDS;
              },
              error => {
                this.iloading = false;
              }
            );
        },
        error => {
          this.iloading = false;
        }
      );
  }

del(id: any, i: number) {
 if (this.iloading || !confirm('Voulez-vous vraiment cet etudiant?(' + this.frag.code + ')')) { return; }
 this.iloading = true;
 this.app.delData(`${environment.apiUrl}parcours_frags/${id}`)
      .pipe(first())
      .subscribe(
        data => {
          this.iloading = false;
          this.STUDS.splice(i, 1);
          this.HSTUDS = this.STUDS;
        },
        error => {
          this.iloading = false;
        }
      );
}

setDisc(o, i) {
  const DATA = {
   absence : o.absence,
   retard  : o.retard,
   note_1  : o.note_1,
   note_2  : o.note_2,
   mention : o.mention,
   };
  this.app.editData(`${environment.apiUrl}parcours_frags/${o.id}`, DATA)
    .pipe(first())
    .subscribe(
      data => {
        this.STUDS[i] = data;
        this.msg[i] = 'Modification effectuée avec succès';
      },
      error => {
        this.msg[i] = 'Modification non effectuée';
      }
    );

}


closeDoc(id, state, i) {

  this.app.getData(`${environment.apiUrl}closeOnePars/${id}/${state}`)
    .pipe(first())
    .subscribe(
      data => {
        this.PSTUDS[i].actived = state;
        this.PHSTUDS = this.PSTUDS;
        this.msg[i] = 'Modification effectuée avec succès';
      },
      error => {
        this.msg[i] = 'Modification non effectuée';
      }
    );
}

  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.PSTUDS = this.OnfilterItems(query);
    } else {
      this.PSTUDS = this.PHSTUDS;
    }
  }

  OnfilterItems(searchTerm) {
    return this.PSTUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

 remSTP(o, i) {
    if (this.dloading[i]) {
      return;
    }
    this.dloading[i] = true;
    const url = `${environment.apiUrl}delStudentToPromo/${o.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (!data.crash) {
            this.dloading[i] = false;
            this.PSTUDS.splice(i, 1);
            this.response.state = 'success';
            this.response.message = 'Etudiant supprimé de cette promotion';
            this.PHSTUDS = this.PSTUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = 'erreur serveur';
          }
        },
        (error) => {
          this.dloading[i] = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

 remSTPV2(o, i) {
    if (this.dloading[i]) {
      return;
    }
    this.dloading[i] = true;
    const url = `${environment.apiUrl}delStudentToPromoV2/${o.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (!data.crash) {
            this.dloading[i] = false;
            this.PSTUDS.splice(i, 1);
            this.response.state = 'success';
            this.response.message = 'Etudiant supprimé de cette promotion';
            this.PHSTUDS = this.PSTUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = 'erreur serveur';
          }
        },
        (error) => {
          this.dloading[i] = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

reAdd(o, i) {
console.log(o);
if (this.dloading[i]) {
      return;
    }
this.dloading[i] = true;
const url = `${environment.apiUrl}addStudentToSamePromo`;
const data = {
      id_opaie: this.moption,
      id_student: o.idu,
      id_promo: this.cpromo.id,
    };
this.app
      .setData(url, data)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          this.dloading[i] = false;
          if (!data.crash) {
            this.PSTUDS.splice(i, 1);
            this.response.state = 'success';
            this.response.message = 'Cet(te) etudiant(e) refait la classe ';
            this.PHSTUDS = this.PSTUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.dloading[i] = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
  }

 getOP() {
    this.app
      .getData(
        `${environment.apiUrl}getOptionPaiement?code=${this.cpromo.code_cycle}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.OP = data.data;
        },
        (error) => {}
      );
  }


 initCours() {
    this.app.getData(
        `${environment.apiUrl}initCours/${this.cpromo.id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message =  data.message;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
            this.response.active = true;
            this.response.state = 'danger';
            this.response.message = error;
         }
      );
  }
 reset() {
   if (this.iloading || !confirm('Voulez-vous vraiment reinitialiser ce controle?(' + this.frag.code + ')')) { return; }
    this.iloading = true;
   this.DL  = this.STUDS;
   this.cleanUp(0);
 }

cleanUp(i) {
  const l  = this.DL.length;
  if (i < l) {
       this.delReal(this.DL[i], i);
       this.response.active = false;
       i++;
       // tslint:disable-next-line:only-arrow-functions
       setTimeout(function(){
        this.cleanUp(i);
       }.bind(this),500);
   } else {
          this.iloading = false;
          this.STUDS = [];
          this.HSTUDS = this.STUDS;
          this.response.active = true;
          this.response.state = 'success';
          this.response.message = 'Suppression terminée';
   }
}
 delReal(o: any, i: number) {
 this.app.delData(`${environment.apiUrl}parcours_frags/${o.id}`)
      .pipe(first())
      .subscribe(
        data => {
            this.response.active = true;
            this.response.state = 'success';
            this.response.message =  o.nom+' '+o.pnom+' ('+o.code+') effacé(e)';
        },
        error => {
        }
      );
   }

  saveName(o: any, i: number) {
  let DATA = { id: o.id, code: o.code, nom: o.lastName, pnom: o.firstName };
  //  console.log(DATA);
   this.app.setData(`${environment.apiUrl}changeNamePC`, DATA)
      .pipe(first())
      .subscribe(
        data => {
            this.response.active = true;
            this.response.state = 'success';
            this.response.message = data.message;
        },
        error => {
          console.log(error);
        }
      );
   }

saveNameF(o: any, i: number) {
  let DATA = { id: o.id, code: o.code, nom: o.nom, pnom: o.pnom };
 //  console.log(DATA);
   this.app.setData(`${environment.apiUrl}changeNamePCF`, DATA)
      .pipe(first())
      .subscribe(
        data => {
            this.response.active = true;
            this.response.state = 'success';
            this.response.message = data.message;
        },
        error => {
          console.log(error);
        }
      );
   }
}
