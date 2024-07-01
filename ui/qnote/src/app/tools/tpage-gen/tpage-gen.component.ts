import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Acad } from '../models/Gen/Acad';
import { Period } from '../models/Period';
import { Results } from '../models/Results';

@Component({
  selector: 'app-tpage-gen',
  templateUrl: './tpage-gen.component.html',
  styleUrls: ['./tpage-gen.component.css']
})
export class TPageGenComponent implements OnInit {

   constructor() {
  }
  innerWidth: number;
  per = 58;
  height = 0;
  width = 0;

  @Input() coef: number;
  @Input() period: Acad;
  @Input() tools;

  bmodel = 'default';
  results: Results[] = [];
  apps: Results[] = [];
  total_note = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
     const w = window.innerWidth;
     this.initHeight(w);
  }

  @HostListener('window:changeHeight', ['$event'])
  changeHeight() {
     const w = window.innerWidth;
    this.initHeight(w);
    this.initHeight(w);
  }


  ngOnInit(): void {
    const w = window.innerWidth;
    console.log(this.period);
    this.initHeight(w);
  }

  initResults(bulletin) {
  bulletin.results.forEach(element => {
      if (element.cours.is_calc) {
         this.results.push(element);
        } else {
         this.apps.push(element);
      }
    });
  }
  parseInt(i) {
    return parseInt(i);
   }

  initHeight(w) {
    if(this.period && this.period.etab){
     const ws = (w * this.per) / 100;
     const wpage = (ws * 98) / 100;
   //  console.log('WIDTH  :' + wpage);
     const hpage = (wpage * this.period.etab.height) / this.period.etab.width;
    // console.log('HEIGHT :' + hpage);
     this.height = hpage;
    }
  }

  getTotalNote(bulletin) {
    let total = 0;
    for (const res of bulletin.results) {
      if (res.cours.is_calc && res.is_calc) {
          total += parseFloat(res.note);
       }
    }
    this.total_note = total;
    return total;
  }

  getResultsCalc(bulletin) {

    const results = [];
    bulletin.results.forEach(element => {
        if (element.cours.is_calc) {
            results.push(element);
        }
       });
    return results;
  }

  getResultsNonCalc(bulletin) {
    const results = [];
    bulletin.results.forEach(element => {
        if (!element.cours.is_calc && element.cours.is_number ) {
           results.push(element);
        }
    });

    return results;
  }
  delResults(iu, code) {
    // tslint:disable-next-line:prefer-for-of
     for (let i = 0; i < this.period.bulletins[iu].results.length; i++) {
       if (this.period.bulletins[iu].results[i].cours.code === code) {
          this.period.bulletins[iu].results.splice(i, 1);
          break;
       }
     }
  }
  getMoyClasse() {

    return this.period.moy_classe;
  }
  // tslint:disable-next-line:variable-name
  getMoy(total_note, tnote, moy_total) {
    return ((total_note / tnote) * moy_total);
  }

}
