
import { User} from "../User";
import { PeriodGen } from "./PeriodGen";
import { ResultsGen } from './ResultsGen';

export class BulletinGen {


  code: any;
  user: User;
  public results: ResultsGen[];
  public total_note_period: any [] = [];
  public total_note = 0;
  public mention: string;
  public moy_gen = 0;
  public coef = 0;
  public constructor(code: any,  user: User) {
   this.code = code;
   this.user = user ;
  }



}
