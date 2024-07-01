import { Cours } from "./Cours";

export class Results {
   code;
   cours:Cours;
   note;
   // tslint:disable-next-line:variable-name
   is_calc: boolean;

  public constructor(code, cours:Cours, note){
    this.code = code ;
    this.note = note;
    this.cours = cours;
    this.is_calc = cours.is_calc;
  }
}