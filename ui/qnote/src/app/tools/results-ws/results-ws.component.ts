import { Component, OnInit, Input } from '@angular/core';
import { BaseApp } from '../BaseApp';
import { Period } from '../models/Period';
import { Cours } from '../models/Cours';
import { Results } from '../models/Results';
import { Etab } from '../models/Etab';

@Component({
  selector: 'app-results-ws',
  templateUrl: './results-ws.component.html',
  styleUrls: ['./results-ws.component.css']
})
export class ResultsWsComponent extends BaseApp implements OnInit {
  @Input() period: Period;
  view = false;
  el1 = -1; el2 = -1;
  constructor() {
    super();
  }
  tcolor = [];
  cname = [];
  changePlace(ic) {
    if (this.el1 === -1) {
      this.el1 = ic;
      this.tcolor[ic] = 'green';
      return;
    }
    if (this.el1 !== -1 &&  this.el1 === ic) {
       this.el1 = -1;
       this.tcolor[ic] =  'transparent';
       return;
    }

    if (this.el1 !== -1 &&  this.el1 !== ic) {
      this.el2 = ic;
      this.tcolor[ic] = 'yellow';
      this.permute();
    }
  }

  permute() {
    if (this.el1 !== -1 && this.el2 !== -1 ) {
            // tslint:disable-next-line:prefer-for-of
            for (let i =   0; i < this.period.bulletins.length; i++) {
               // tslint:disable-next-line:prefer-const
               let res1 = this.period.bulletins[i].results[this.el1];
               // tslint:disable-next-line:prefer-const
               // tslint:disable-next-line:no-var-keyword
               // tslint:disable-next-line:prefer-const
               let res2 = this.period.bulletins[i].results[this.el2];
               this.period.bulletins[i].results[this.el2] = res1;
               this.period.bulletins[i].results[this.el1] = res2;
              /***********************************/ /************************/
               const crs1 = this.period.cours[this.el1];
               const crs2 = this.period.cours[this.el2];
               this.period.cours[this.el2] = crs1;
               this.period.cours[this.el1] = crs2;
              /**************************/  /************************/
            }
            this.tcolor[this.el1] = 'transparent';
            this.tcolor[this.el2] =  'transparent';
            this.el1 = -1;
            this.el2 = -1;
    }
  }

  ngOnInit(): void {
    console.log(this.period);
    this.setMargin();
    this.genMoyStud();
  }
  setMargin() {
    for (const res of this.getResultsCalc()) {
      this.margins[res.code] = 400;
    }
  }
   getTotalNote(bulletin) {
    let total = 0;
    for (const res of bulletin.results) {
     if(res && res.cours){
       if (res.cours.is_calc && res.is_calc && res.cours.is_number) {
          total += parseFloat(res.note);
       }
     }
    }
    return total;
   }


  onfocus(i, state) {
    this.cname[i] = state;
  }

  getMinName(name: String) {
    try {
      let aw = name.split(" ");
      if (aw.length==1) {
        return (aw[0].substring(0,3)+".").toUpperCase();
      } else if (aw.length==2) {
          return (aw[0].substring(0,3)+".").toUpperCase() +" "+(aw[1].substring(0,3)+".").toUpperCase();
      } if (aw.length==3) {
          return (aw[0].substring(0,3)+".").toUpperCase() +" "+(aw[1].substring(0,3)+".").toUpperCase() +" "+(aw[2].substring(0,1)+".").toUpperCase();
      }
    } catch (error) {
      return name;
    }
  }

  getPartName(name: string)
  {
  }

   getResultsCalc() {

    const results = [];
    this.period.cours.forEach(element => {
         if (element.is_calc) {
            results.push(element);
         }
       });
    return results;
   }

  getNote(cu, cc) {
    for (let i = 0; i < this.period.bulletins.length; i++) {
      if (this.period.bulletins[i].user.code==cu) {
        for (let j = 0; j < this.period.bulletins[i].results.length; j++) {
          if (this.period.bulletins[i].results[j].cours.code == cc) {
            return this.period.bulletins[i].results[j].note;
          }
        }
      }
    }
    return "";
  }

  setNote(cu, cours: Cours, $event) {
    let cc = cours.code;
    let note = $event.target.value;

     for (let i = 0; i < this.period.bulletins.length; i++) {
      if (this.period.bulletins[i].user.code==cu) {
        for (let j = 0; j < this.period.bulletins[i].results.length; j++) {
          if (this.period.bulletins[i].results[j].cours.code == cc) {
            this.period.bulletins[i].results[j].note = (cours.is_calc) ? parseFloat(note) : note;
            break;
          }
          continue;
        }
      }
      continue;
    }

  }

  getFrags() {
    try {
      return this.period.frags.split("/");
    } catch (error) {
      return [];
    }
  }
  margins: any = [];
  marge = 300;
  viewStat = {
    pass: 0,
    fail: 0
  };
  updateMarge() {

    for (const res of this.getResultsCalc()) {
      this.margins[res.code] = this.marge;
    }

  }

   getMoy(data) {
     return ((data.note / data.tnote) * this.period.etab.moy_total);
   }

   getResultsCalcV2(bulletin) {

    const results:any = [];
    bulletin.results.forEach(element => {
        if (element.cours.is_calc) {
            results.push(element);
        }
       });
    return results;
  }

  callGenMoyStud() {
    if (this.period.stat) {
      this.genMoyStud();
     }
  }

  genMoyStud() {
     this.viewStat = {
                  pass: 0,
                  fail: 0
     };
      this.viewStatSex = {
                  passf: 0,
                  failf: 0,
                  passg: 0,
                  failg: 0
    };
    this.sCours = [];
    this.period.bulletins.forEach(bulletin => {
       const results = this.getResultsCalcV2(bulletin);
       const data = this.calcNote(results, bulletin);
      let moy = this.getMoy(data);
      if (moy >= this.period.etab.moy_pass) {
         this.viewStat.pass++;
        if (bulletin.user.sexe) {
          this.viewStatSex.passg++;
        } else {
          this.viewStatSex.passf++;
        }
        } else {
        this.viewStat.fail++;
         if (bulletin.user.sexe) {
          this.viewStatSex.failg++;
         } else {
          this.viewStatSex.failf++;
        }
       }
    });
  }
  viewStatSex: any;
  calcNote(result:any, b:any) {
    let data = { note: 0, tnote: 0 };
    result.forEach(res => {
       data.note += res.note;
      data.tnote += res.cours.note_total;
      this.setStatCours(res,b);
    });
    return data;
  }
  sCours: any = [];
  setStatCours(res: any, b: any) {
    if (this.sCours[res.cours.code]) {
      if (b.user.sexe) {
        if (res.note >= res.cours.note_pass) {
          this.sCours[res.cours.code].passg++;
        } else {
          this.sCours[res.cours.code].failg++;
        }
      } else {
         if (res.note >= res.cours.note_pass) {
          this.sCours[res.cours.code].passf++;
         } else {
          this.sCours[res.cours.code].failf++;
        }
      }

    } else {
      this.sCours[res.cours.code] = {
                  cours:res.cours,
                  passf: 0,
                  failf: 0,
                  passg: 0,
                  failg: 0
      };
      if (b.user.sexe) {
        if (res.note >= res.cours.note_pass) {
          this.sCours[res.cours.code].passg++;
        } else {
          this.sCours[res.cours.code].failg++;
        }
      } else {
         if (res.note >= res.cours.note_pass) {
          this.sCours[res.cours.code].passf++;
         } else {
          this.sCours[res.cours.code].failf++;
        }
      }

    }
  }
  getCours() {
    let c = [];
    for (const i in this.sCours) {
        console.log(i);
        c.push(this.sCours[i]);
    }
    return c;
  }
}


