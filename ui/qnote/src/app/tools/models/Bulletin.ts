import { Results } from "./Results";
import { User} from "./User";

export class Bulletin {
  code: any;
  user: User;
  results: Results[];
  // tslint:disable-next-line:variable-name
  total_note: number;
  mention: string ;
  public constructor(user: User, res: Results[], t){
   this.code = user.code;
   this.user = user ;
   this.results = res;
   this.total_note = t;
   this.mention = "";
  }
}
