import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import * as XLSX from 'xlsx';

import Excel from '@grapecity/spread-excelio';

import { BaseApp } from '../BaseApp';
import { Bulletin } from '../models/Bulletin';
import { Cours } from '../models/Cours';
import { Period } from '../models/Period';
import { Results } from '../models/Results';
import { User } from '../models/User';
import { XCours } from '../models/XCours';
import { XUser } from '../models/XUser';

@Component({
  selector: 'app-tools-right',
  templateUrl: './tools-right.component.html',
  styleUrls: ['./tools-right.component.css']
})
export class ToolsRightComponent extends BaseApp implements OnInit {
  constructor() {
    super();
    this.excelIO = new Excel.IO();

  }

  @Input() period: Period;
  cours = { code: '', name: '', note_total: 10, note_pass: 6, note_rep: 5, note_exc: 8 , is_calc: true, is_number:true};

  user = { code: '', name: '', section: '', sexe:false};
  ut = false;
  ct = false;
  euser: any;
  eupos;
  ecpos;
  ecours: any;
  excelIO;
  rcours;
  rstudent;
  // tslint:disable-next-line:member-ordering
  importResultsUser: XUser[] = [];
    // tslint:disable-next-line:member-ordering
  importResultsCours: XCours[] = [];

 locker = true ;

 sc ;

  ngOnInit(): void {
    this.hcours = this.period.cours;
  }

   closeEditUser() {
     this.euser = undefined;
     this.eupos = -1;
     this.ut = false;
  }
  closeEditCours() {
    this.ecours = undefined;
    this.ecpos = -1;
    this.ct = false;
  }

  editUser(o, i) {
    this.euser = o;
    this.eupos = i;
    this.ut = true;
  }
  editCours(o, i) {
    this.ecours = o;
    this.ecpos = i;
    this.ct = true;
  }

  delUser(o: User, j) {
      this.delHUsers(o.code);
      this.period.users.splice(j, 1);
      for (let i = 0; i < this.period.bulletins.length; i++) {
        if (o.code === this.period.bulletins[i].user.code) {
          this.period.bulletins.splice(i, 1);
          break;
        }
      }
      this.setAlert('alert-info alert-login', 'Succès', 104);

  }

  delCours(o: Cours, j) {
     // if (this.period.cours.length > 1) {
      this.delHCours(o.code);
      this.period.cours.splice(j, 1);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.period.bulletins.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let k = 0; k < this.period.bulletins[i].results.length; k++) {
          if (o.code === this.period.bulletins[i].results[k].cours.code) {
            this.period.bulletins[i].results.splice(k, 1);
            break;
          }
        }
      }
      this.setAlert('alert-info alert-login', 'Succès', 204);
    // } else {
      // this.setAlert('alert-danger alert-login', 'Vous devez laisser au moins un cours', 204);
    // }
}


  addUserNow() {

    if (this.user.code !== '' && this.user.name !== '') {
      this.addUser(this.user);
    } else {
        this.setAlert('alert-danger alert-login', 'Tout les champs doivent être remplis', 100);
    }
  }

  addUser(user: any) {
    if (!this.search(user.code, this.period.users)) {
      let sexe = (user.sexe == true || user.sexe == 1) ? true : false;
      const u = new User(user.code, user.name, user.section, sexe);
      this.period.users.push(u);
      // tslint:disable-next-line:prefer-const
      let res: Results[] = [];
      this.period.cours.forEach(element => {
        const cr = this.period.annee + '-' + this.period.classe + '-' + this.period.name + '-' + element.code + '-' + u.code;
        const r = new Results(cr, element, '');
        res.push(r);
      });
      const b = new Bulletin(u, res, this.period.coef);
      this.period.bulletins.push(b);
      this.setAlert('alert-info alert-login', 'Succès', 100);
      this.user = { code: '', name: '', section: '', sexe:false};
    } else {
            this.setAlert('alert-danger alert-login', 'Le code existe deja', 100);
    }
  }
  onFileChangeUser(args) {
    const self = this;
    const file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    const f = file.name.split('.');
    const ext = f[f.length - 1];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = this.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new XUser());
      const importedData = data.slice(1, -1);

      this.importResultsUser = importedData.map((arr) => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as XUser;
      });
    };
    reader.readAsBinaryString(file);
  }

   onFileChangeCours(args) {
    const self = this;
    const file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    const f = file.name.split('.');
    const ext = f[f.length - 1];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = this.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new XCours());
      const importedData = data.slice(1, -1);

      this.importResultsCours = importedData.map((arr) => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as XCours;
      });
    };
    reader.readAsBinaryString(file);
  }

 public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1,
    }) as XLSX.AOA2SheetOpts;

    return data;
 }

public async addUserByXSLX() {
if (!this.locker) {return; }
this.locker = false;
const sl = this.importResultsUser.length;
await this.showLoading(true, 1);
if (sl !== 0) {
       const timer = setTimeout(function() {
         clearTimeout(timer);
         this.addUserFinish(sl);
        }.bind(this), 2000);
     } else {
          this.locker = true;
          this.closeLoading();
          this.setAlert('alert-danger alert-login', 'Vous devez sélectionner un fichier excell', 300);
    }
  }
  addUserFinish(sl) {
     for (let i = 0; i < sl; i++) {
         this.addUser(this.importResultsUser[i]);
      }
     this.locker = true;
     this.setAlert('alert-info alert-login', 'Succès', 300);
     this.closeLoading();
  }

  public addCoursByXSLX() {
   this.sc = this.importResultsCours.length;
   this.showLoading(true, 2);
   if (this.importResultsCours.length !== 0) {
      this.importResultsCours.forEach(cours => {
        --this.sc;
        this.addCours(cours);
        if (this.sc === 0) {
            this.setAlert('alert-info alert-login', 'Succès', 301);
            this.closeLoading();
         }
      });
    } else {
    this.setAlert('alert-danger alert-login', 'vous devez sélectionner un fichier excell', 301);
    this.closeLoading();
    }

  }

  addCours(c: XCours) {

      if (!this.search(c.code, this.period.cours)) {
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        const is_calc = (c.is_calc === 1) ? true : false;
        // tslint:disable-next-line:max-line-length
        const cours = new Cours(c.code, c.name, c.note_total, c.note_pass, c.note_rep, c.note_exc, is_calc );
        this.period.cours.push(cours);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.period.bulletins.length; i++) {
          // tslint:disable-next-line:max-line-length
          const cr = this.period.annee + '-' + this.period.classe + '-' + this.period.name + '-' + cours.code + '-' + this.period.bulletins[i].user.code;
          const r = new Results(cr, cours, '');
          this.period.bulletins[i].results.push(r);
        }
      }

    }

  addCoursNow() {
    if (this.cours.code !== '' && this.cours.name !== '' ) {
        if (!this.search(this.cours.code, this.period.cours)) {
        // tslint:disable-next-line:max-line-length
        const cours = new Cours(this.cours.code, this.cours.name, this.cours.note_total, this.cours.note_pass, this.cours.note_rep, this.cours.note_exc, this.cours.is_calc);
        cours.is_number = this.cours.is_number;
        this.period.cours.push(cours);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.period.bulletins.length; i++) {
          // tslint:disable-next-line:max-line-length
          const cr = this.period.annee + '-' + this.period.classe + '-' + this.period.name + '-' + cours.code + '-' + this.period.bulletins[i].user.code;
          const r = new Results(cr, cours, '');
          this.period.bulletins[i].results.push(r);
        }
        this.setAlert('alert-info alert-login', 'Succès', 200);
      } else {
      this.setAlert('alert-danger alert-login', 'Le code existe deja', 200);
     }

    } else {
    this.setAlert('alert-danger alert-login', 'Tout les champs doivent être rempli', 200);
    }

    }
  editCoursNow(ecours: Cours) {
    let nc: Cours;
    // tslint:disable-next-line:prefer-for-of
    for (let m = 0; m < this.period.cours.length; m++) {
      if (ecours.code === this.period.cours[m].code) {
            this.period.cours[m].name       = ecours.name;
            this.period.cours[m].note_total = ecours.note_total;
            this.period.cours[m].note_pass  = ecours.note_pass;
            this.period.cours[m].note_rep   = ecours.note_rep;
            this.period.cours[m].note_exc   = ecours.note_exc;
            this.period.cours[m].is_calc    = ecours.is_calc;
            this.period.cours[m].is_number  = ecours.is_number;
            break;
      }
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.period.bulletins.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let k = 0; k <   this.period.bulletins[i].results.length; k++) {
        if (ecours.code === this.period.bulletins[i].results[k].cours.code) {
            this.period.bulletins[i].results[k].cours = ecours;
            break;
        }
      }
    }
    this.setAlert('alert-info alert-login', 'Succès', 202);
  }

   editUserNow(euser: User) {
     console.log(euser);
    // tslint:disable-next-line:prefer-for-of
    for (let m = 0; m < this.period.users.length; m++) {
      if (euser.code == this.period.users[m].code) {
            this.period.users[m] = euser;
            break;
      }
    }
    // // tslint:disable-next-line:prefer-for-of
     for (let i = 0; i < this.period.bulletins.length; i++) {
    //   // tslint:disable-next-line:prefer-for-of
      if (euser.code == this.period.bulletins[i].user.code) {
            this.period.bulletins[i].user = euser;
            break;
       }
     }
     this.setAlert('alert-info alert-login', 'Succès', 302);
  }


  search(nameKey, myArray) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < myArray.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (myArray[i].code == nameKey) {
          return true;
        }
    }
    return false;
  }

  cleanUser() {

      this.period.bulletins = [];
      this.period.users = [];
      this.setAlert('alert-info alert-login', 'Succès', 104);
  }

   cleanCours() {
      this.period.bulletins = [];
      this.period.cours = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.period.bulletins.length; i++) {
         this.period.bulletins[i].results = [];
       }
      this.setAlert('alert-info alert-login', 'Succès', 204);
   }

hcours = [];
ckey = 0;
onCoursKey(e) {
     if(this.ckey==0){
      this.hcours = this.period.cours;
      this.ckey++;
     }
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.period.cours = this.filterCoursItems(query);
     } else {
      this.period.cours = this.hcours;
      this.hcours = [];
      this.ckey = 0;
    }
  }


filterCoursItems(searchTerm) {
    return this.period.cours.filter((item) => {
     console.log(item);
      return (
        item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  delHCours(code){
    for (let i = 0; i < this.hcours.length; i++) {
          if(this.hcours[i].code==code){
              this.hcours.splice(i,1);
           }
       }
  }
  // ----------------------
hstuds = [];
skey = 0;
onUsersKey(e) {
     if(this.skey==0){
      this.hstuds = this.period.users;
      this.skey++;
     }
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.period.users = this.filterStudsItems(query);
     } else {
      this.period.users = this.hstuds;
      this.hstuds = [];
      this.skey = 0;
    }
  }


filterStudsItems(searchTerm) {
    return this.period.users.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  delHUsers(code){
    for (let i = 0; i < this.hstuds.length; i++) {
          if(this.hstuds[i].code==code){
              this.hstuds.splice(i,1);
           }
       }
  }

}
