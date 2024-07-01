import { Cours } from "../Cours";

export class PeriodGen {
  public  code;
  public  name;
  public  total_note;
  public  moy_classe;
  public constructor(name){
    this.name = name;
    this.code = name;
  }
}
