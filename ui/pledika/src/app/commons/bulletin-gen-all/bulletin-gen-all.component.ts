import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import * as XLSX from 'xlsx';
import * as GC from '@grapecity/spread-sheets';
import * as Excel from '@grapecity/spread-excelio';

@Component({
  selector: 'app-bulletin-gen-all',
  templateUrl: './bulletin-gen-all.component.html',
  styleUrls: ['./bulletin-gen-all.component.css'],
})
export class BulletinGenAllComponent implements OnInit {
  fakeData = ["1","2","3"]
  users: any;
  moy = [];
  rper = [];
  palm = false; 
  moy_palm = false;
  rem=false;
  remText = "Remarques : ";
  decText =  "Décision de fin d'année";
  marginTopSign = 70;
  marginTopNote = 20;
  pageM=50;
  start = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    public studServ: StudentsService
  ) {}
  parcours = [];
  coef;
  total_coef = {};
  total = {
    coef: 0,
    ctrl_1: 0,
    ctrl_2: 0,
    ctrl_3: 0,
    ctrl_4: 0,
    moy: 0,
    extra: 0,
    ctrl_5: 0,
    ctrl_6: 0,
  };
  etab: any;
  POS: number;
  ID: any;
  periods: any;
  iloading: boolean;
  STUDS = [];
  HSTUDS = [];
  NB: any;
  initb: boolean;
  CT: number;
  results: any;
  newRes: any;
  aResults = [];
  line: {
    note_pass: number;
    note_total: number;
    frag_cours: string;
    coef: number;
    moy: number;
    extra: number;
  };
  promo: any;
classes = [];
  nper = [];
  mg = false;
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.POS = -1;
    this.getAF()
    this.getEtabInfo();
    this.getPROMO();
  
  }
 setMoyenneGen(){
    const url = `${environment.apiUrl}setMoyenGen/${this.ID}`;
     this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        () => {}
      );
 }
fileName: any;
exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('list_user');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.fileName =  this.promo.code+'.xlsx';
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


  getAF() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
            this.classes = data.data;
            console.log(this.classes);
          }
        },
        (error) => {
          
        }
      );
  }
starOver(){
   this.getParcours(this.ID);
   this.start = true;
 }

  getPROMO() {
    this.app
      .getData(`${environment.apiUrl}promotions/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promo = data;
          this.coef = this.promo.promo_coef;
        },
        (error) => {}
      );
  }

editCP(note) {
    this.app
      .editData(`${environment.apiUrl}promotions/${this.ID}`, {promo_coef: note})
      .pipe(first())
      .subscribe(
        (data) => {
          this.promo.promo_coef = note;
        },
        (error) => {}
      );
  }
  setBG(o) {
    // tslint:disable-next-line:triple-equals
    if (o == this.ID) {
      return '#34c929';
    }
    return '';
  }

  setTC(o) {
    if (o.id === this.ID) {
      return 'white';
    }
    return '';
  }

 setTCP(o) {
    if (o === this.ID) {
      return 'white';
    }
    return '';
  }

  setBGP(o) {
    // tslint:disable-next-line:triple-equals
    if (o == this.ID) {
      return '#34c929';
    }
    return '';
  }

  setPage(idu) {
    this.ID = idu;
  }

  changePage(idu, i) {
    this.ID = idu;
    this.POS = i;
  }

  getEtabInfo() {
    this.app
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }

  getParcours(idp) {
    this.iloading = true;
    this.app
      .getData(`${environment.apiUrl}resultsForBG/${idp}`)
      .pipe(first())
      .subscribe(
        (data) => {
       //   console.log(data.data);
          this.setData(data.data);
          this.start = true;
        },
        (error) => {
          this.iloading = false;
        }
      );
  }
  setData(data: any) {
    this.iloading = false;
    this.users = data.parcours;
    this.setPars(data.parcours);
    this.periods = data.promofrag;
    this.startArrange(data.results);
   // console.log(this.parcours);
  }
  startArrange(data: any) {
    this.aResults = data;
    // tslint:disable-next-line:forin
    for (const i in this.periods) {
      this.periods[i].share_code = this.periods[i].share_code.replace(' ', '_');
      this.nper.push(this.periods[i].share_code);
      this.rper.push(this.periods[i]);
      this.getMoyGen(i, i);
    }
    // tslint:disable-next-line: forin
    for (const i in data) {
      const results = this.aResults[i];
      this.CreateOneBT(results, i);
    }
    this.mg = true;
  }

  CreateOneBT(results, id) {
 
    const line = this.getLine();
    const total = { coef: 0, moy: 0 };
    const newRes = [];
    const frac = {};
    // tslint:disable-next-line:forin
    for (const i in results) {
    results[i].forEach((e) => {
     if (e) {
     if (!frac[e.frag_cours.name]) {
       frac[e.frag_cours.name] = 0;
     }
     if (!total[this.periods[i].share_code + '_coef']) {
       total[this.periods[i].share_code + '_coef'] = 0;
     }
     frac[e.frag_cours.name]++;
     // console.log(e);
     if (newRes.length === 0) {
          newRes.push({
            note_pass:  (e.note_pass)  ? e.note_pass :  0 ,
            note_total: (e.note_total) ? e.note_total : 0 ,
            frag_cours: e.frag_cours.name,
            coef:  e.frag_cours.coef,
            [this.periods[i].share_code]:  (e.note) ? e.note : 0,
            moy: 0,
            extra: 0,
            moy_ann: 0,
            period: this.periods[i].share_code
          });
          total[this.periods[i].share_code+'_coef'] += e.note_total*e.frag_cours.coef;
          total[this.periods[i].share_code] = 0;
        } else {
          let f = false;
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < newRes.length; j++) {
            if (newRes[j].frag_cours === e.frag_cours.name) {
                newRes[j][this.periods[i].share_code] = (e.note) ? e.note : 0;
               // sa se pou gade kombyen fwa li yo kompoze pou matye sa
                total[this.periods[i].share_code + '_coef'] += e.note_total * e.frag_cours.coef;
                total[this.periods[i].share_code] = 0;
                f = true;
                break;
            }
          }
          if (!f) {
            newRes.push({
              note_pass: (e.note_pass) ? e.note_pass : 0,
              note_total: (e.note_total) ? e.note_total : 0 ,
              frag_cours: e.frag_cours.name,
              coef: e.frag_cours.coef ,
              [this.periods[i].share_code]: (e.note) ? e.note: 0,
              moy: 0,
              extra: 0,
              moy_ann: 0,
              period: this.periods[i].share_code
            });

            total[this.periods[i].share_code + '_coef'] += e.note_total * e.frag_cours.coef;
            total[this.periods[i].share_code] = 0;

          }
        }
      }
      });

    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < newRes.length; i++) {
      let t = 0;
      // tslint:disable-next-line:forin
      for (const j in this.periods) {
    
        if (newRes[i][this.periods[j].share_code]!=undefined){
          t += newRes[i][this.periods[j].share_code];
          total[this.periods[j].share_code] += newRes[i][this.periods[j].share_code] * newRes[i].coef;
        }
        // verifye si coef_total la gen matyer sa nan control la
        if (newRes[i][this.periods[j].share_code]) {
         // total[this.periods[j].share_code + '_coef'] += newRes[i].coef * newRes[i].note_total;
        }
      }
    // newRes[i].moy_ann = (t / this.nper.length).toFixed(2);  // sa divizel pa nomb peryod la
      newRes[i].moy_ann = (t / frac[newRes[i].frag_cours] ).toFixed(2);  // sa divize pa nombre fwa matye sa paret
      total.coef += newRes[i].coef * newRes[i].note_total;
      total.moy  += newRes[i].coef * newRes[i].moy_ann;
    }

     // jwenn coef total
     // tslint:disable-next-line:align
     total["coef_total"] = 0;
     // tslint:disable-next-line: align
     total["moy_gen"] = 0;
     let nmoy = 0;
    // tslint:disable-next-line: forin
    for (const j in this.periods) {
          total["coef_total"] += total[this.periods[j].share_code + '_coef'];
          // tslint:disable-next-line:max-line-length
          let m = ( total[this.periods[j].share_code]> 0 && total[this.periods[j].share_code + '_coef'] > 0 ) ? (( total[this.periods[j].share_code] / total[this.periods[j].share_code + '_coef'] ) * this.promo?.moy_total).toFixed(2) : 0;
          total[this.periods[j].share_code + '_moy'] = m;
          nmoy += parseFloat(total[this.periods[j].share_code + '_moy']);
    }
    let sc =this.nper.length;
    // tslint:disable-next-line: quotemark
    total["coef_total"] = (total["coef_total"]/sc ).toFixed(2);
    total["moy_gen"]    =  (nmoy/sc).toFixed(2);

    console.log(newRes);
    // tslint:disable-next-line:prefer-for-of
    this.parcours.push({ cpars: this.users[id], total, results: newRes});
  }

  getMoyAnn(o) {
    return o.moy_ann / this.periods.length;
  }

  getRepMoy(rep, moy, coef) {
    if (this.etab.type_reprise === 1) {
      return (rep / coef) * moy;
    } else {
      let tmoy = this.total.moy;
      tmoy = this.total.ctrl_5;
      tmoy += this.total.ctrl_6;
      return (tmoy / coef) * moy.toFixed(2);
    }
  }

  getMoyGen(IDF, i) {
    this.app
      .getData(`${environment.apiUrl}getMoyGenFrag/${IDF}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.moy[i] = data;
        },
        (error) => {}
      );
  }

  getMoy(moy, promo, nper, periods) {
    let t = 0;
    // tslint:disable-next-line:forin
    for (const i in this.periods) {
      t +=
        moy[periods[i].id] !== undefined
          ? moy[periods[i].id] * promo.moy_total
          : 0;
    }
    const r = t / nper.length;
    return r;
  }

  setPars(data) {
    // tslint:disable-next-line:forin
    for (const i in data) {
      this.STUDS.push(data[i]);
    }
    this.HSTUDS = this.STUDS;
    this.NB = this.STUDS.length;
    this.CT = -1;
  }

  setText(p) {
    return p.replace('_', ' ').substring(0, 5);
  }

  getLine() {
    const line = {
      note_pass: 0,
      note_total: 0,
      frag_cours: '',
      coef: 0,
      moy: 0,
      extra: 0,
      moy_ann: 0,
    };
    // tslint:disable-next-line:forin
    for (const i in this.periods) {
      line[this.periods[i].share_code] = 0;
    }
    return line;
  }

  onKey(e: { target: { value: any } }) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm: string) {
    return this.STUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
  getDec(moy_accept, moy, rep, ir, tr) {
    if (moy >= moy_accept) {
      return  [moy,"Promu(e) en classe superieure"];
    } else {
      if (ir === 2) {
     //   return 'L\'élève doit refaire la classe '+moy;
          return [moy];
      } else {
        if (tr === 1) {
          if (rep > 0) {
            if (rep < moy_accept) {
              return [moy,'Après une reprise l\'élève doit refaire la classe '];
            } else {
              return  [rep, 'Après une reprise l\'élève est promu(e) en classe superieure avec la moyenne de '];
            }
          } else {
            //return 'L\'élève doit refaire la classe ' +moy;
              return [moy];
          }
         } else {
        // return 'L\'élève doit refaire la classe ' +moy;
           return [moy];
        }
      }
    }
  }
  getTotalNoteStud(c , n) {
    
    if(n!=undefined){
      return c*n; 
    }
    return 0;
  }
}
