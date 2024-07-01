import { Cours } from "../Cours";

export class ResultsGen {
   code;
   cours:Cours;
   note: any [] = [];
   note_total:any;
   // tslint:disable-next-line:variable-name
   is_calc: boolean;
   is_number: boolean;
  public constructor(code, cours:Cours){
    this.code = code ;
    this.cours = cours;
    this.is_calc = cours.is_calc;
  }
  setNotTotal() {
    let nt = 0;
    if (this.cours.is_number) {
      for (let n of this.note) {
        nt += parseFloat(n);
      }
      if(this.cours.is_calc){
         if (this.note.length > 0) {
           nt = nt  / this.note.length;
         }
      }
      this.note_total = nt;
    }


  }
}
