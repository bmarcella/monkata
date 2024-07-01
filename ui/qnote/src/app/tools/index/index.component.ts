
import {AppService} from '../_services/app.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Period } from '../models/Period';
import { Cours } from '../models/Cours';
import { Users } from '../models/Users';
import { Results } from '../models/Results';
import { Bulletin } from '../models/Bulletin';
import { Etab } from '../models/Etab';
import { envQNote } from 'src/environments/environment.prod';
import { first } from 'rxjs/internal/operators/first';
import { BaseApp } from '../BaseApp';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseApp   implements OnInit {


 // tslint:disable-next-line:max-line-length
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private formBuilder: UntypedFormBuilder,
    private auth: AuthenticationService,
    private formBuilder2: UntypedFormBuilder) {
   super();
   this.CUSER = this.auth.currentUserValueX;
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   sessionStorage.setItem('TYPE_APP',"QNOTE");
 }
  get f() {
    return this.loginForm.controls;
  }

  get r() {
    return this.regForm.controls;
  }
  setPage(p: any) {
    this.resMode = p;
    sessionStorage.setItem('PAGE',p);
  }
  CUSER: Users;
 show = '1';
 public period: Period;
 public cours: Cours;
 public cours2: Cours;
 public user: User;
 public bulletin: Bulletin;
 public etab: Etab;
 public tools = true;
 public resMode = 0;
 public loginForm: UntypedFormGroup;
 public regForm: UntypedFormGroup;
 public acad: any;
 public niv: any;
 public fragment: any;
 public  submitted = false;
 public submitted1 = false;
 public token_b = '';
 public periods;
 public clone = true;
 public change_pass =  {password: '', pass_1: '', pass_2: '' };
 public change_name =  {fullName: '', phone :''};
 public change_email = {email: ''};
 public pin;
 setUser(e) {
   this.CUSER = e.user;
   this.period = e.period;
 }

  initForm(){

 this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    });
    // tslint:disable-next-line:prefer-const
     this.regForm = this.formBuilder2.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

 }

  ngOnInit(): void {
     this.initForm();
     this.getQnoteData();
     if (this.CUSER?.token_user) {
          this.getBulletinData();
     }

     this.token_b = this.route.snapshot.params.token;
     if (this.token_b == '' || this.token_b == null) {
      const period = sessionStorage.getItem('PERIOD_DATA');
      // console.log(period);
      if (period == '' || period == null || period == undefined) {
        this.initData();
        const data = JSON.stringify(this.period);
        sessionStorage.setItem('PERIOD_DATA', data);
      } else {
        this.period = JSON.parse(period);
      }
     } else {
       this.getBulletin();
     }

    let page =sessionStorage.getItem('PAGE');
   // console.log(this.setPage);
    if (page != null && page != undefined) {
        if (parseInt(page) == 2 && this.CUSER!= undefined) {
          page = "0";
          this.setPage(0);
        }
        this.resMode = parseInt(page);
    }
     if (this.resMode<0) {
         this.resMode = 0;
     }
    // console.log(this.resMode);
  }
  getBulletin() {
      this.app.getData(`${envQNote.endpoint}BO/@Bulletin/getBulletinByToken/${this.token_b}`)
      .pipe(first())
      .subscribe(
        data => {
         // console.log(data);
          if (!data.crash) {
            if (data.body.data.DATA != null && data.body.data.DATA != '') {
              this.period = data.body.data.DATA;
             //  console.log(this.period);
              const dataj = JSON.stringify(this.period);
              sessionStorage.setItem('PERIOD_DATA', dataj);
              } else {
               this.router.navigate(['app/tools']);
            }
           }
        }, error => {
           console.log(error);
        }
      );
  }

  pay() {
  }


  saveData() {
    if (this.CUSER.token_user !== '') {
       this.saveBulletin();
       } else {
      this.setPage(2);
    }
  }

  clear() {
    const data = null;
    sessionStorage.setItem('PERIOD_DATA', data);
    this.initData();
    const newData = JSON.stringify(this.period);
    sessionStorage.setItem('PERIOD_DATA', newData);
  }
   newBulletin() {
    const data = null;
    sessionStorage.setItem('PERIOD_DATA', data);
    this.initData();
    const newData = JSON.stringify(this.period);
    sessionStorage.setItem('PERIOD_DATA', newData);
    this.router.navigate(['app/tools']);
  }
  initData() {
    let name = (this.CUSER!=undefined && this.CUSER.etab_name)? this.CUSER.etab_name : "Collège Pledika";
    this.etab = new Etab('E-1',name, 10, 6, 5.5, 8);
    this.cours =  new Cours(1, 'Mathematiques', 100, 60, 50, 80, true);
    this.cours2 = new Cours(2, 'Absence', 0, 0, 0, 0, false);
    this.user = new User('MG-1001', 'Marcella Luc', 'A', true);
    this.bulletin = new Bulletin(this.user, [new Results('R-1', this.cours, 7), new Results('R-2', this.cours2, 2)], 10);
    this.period = new Period('2021-2022', '1er Controle', '1ère Année fondamentale', [this.bulletin], this.etab);
    this.period.setOneCours(this.cours);
    this.period.setOneCours(this.cours2);
    this.period.setOneUser(this.user);
  }

  getQnoteData() {
    this.app.getData(`${envQNote.endpoint}BO/@App/home`)
      .pipe(first())
      .subscribe(
        data => {
          if (!data.crash) {
            this.acad = data.body.data.acad;
            this.niv = data.body.data.niveau;
            this.fragment = data.body.data.periode;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
    getBulletinData() {
    this.app.getData(`${envQNote.endpoint}BO/@Bulletin/getBulletinByUser`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (!data.crash) {
                 this.periods = data.body.data.DATA;
          }
        },
        error => {
           console.log(error);
        }
      );
    }

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.f.email.value;
    const pass = this.f.pass.value;
    const data: FormData = new FormData();
    data.append('email', email);
    data.append('password', pass);
    this.app.setData(`${envQNote.endpoint}BO/@App/login`, data)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          if (!data.crash) {
            if (!data.body.data.ERROR) {
              this.setAlert('alert-info alert-login', 'Succès',11);
              this.CUSER = data.body.data.DATA;
              this.auth.setUserDataX(data.body.data.DATA);
              this.resMode = 0;
              this.setPage(0);
              this.initForm();
              this.closeAlert();
              this.router.navigate(['app/tools']);
            } else {
              this.setAlert('alert-danger alert-login', data.body.data.MESSAGE, 11);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }



  onSubmitReg() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }
    const email =    this.r.username.value;
    const password = this.r.password.value;
    const fullName = this.r.fullname.value;
    const phone =    this.r.phone.value;
    const data: FormData = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('fullName', fullName);
    data.append('phone', phone);
    console.log(data);
    this.app.setData(`${envQNote.endpoint}BO/@App/addUser`, data)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          if (!data.crash) {
            if (!data.body.data.ERROR) {
              this.setAlert('alert-info alert-login', 'Succès', 10);
              this.CUSER = data.body.data.DATA;
              this.auth.setUserDataX(data.body.data.DATA);
              this.setPage(0);
              this.initForm();
              this.closeAlert();
              this.router.navigate(['app/tools']);
            } else {
              this.setAlert('alert-danger alert-login', data.body.data.MESSAGE, 10);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.CUSER = undefined;
    this.periods = [];
    this.setPage(2);
    this.auth.logoutX();
    this.initData();
    const data = JSON.stringify(this.period);
    sessionStorage.setItem('PERIOD_DATA', data);
    this.router.navigate(['app/tools']);
  }
  open(token) {
    if (confirm('Voulez-vous enregistrer ce bulletin ? ')) {
      this.saveBulletinAndNext(token);
    } else {
      this.setPage(0);
      this.router.navigate(['app/tools/'+token]);
    }
  }

  duplicate(token) {
    if (confirm("Voulez-vous vraiment dupliquer ce bulletin scolaire")) {
      if (!this.clone) {
        return;
      }
      this.clone = false;

      this.app.getData(`${envQNote.endpoint}BO/@Bulletin/cloneBulletin/${token}`)
        .pipe(first())
        .subscribe(
          data => {
            if (!data.crash) {
              this.setAlert('alert-info alert-login', data.body.data.MESSAGE, 13);
              sessionStorage.setItem('PERIOD_DATA', null);
              this.getBulletinData();
            } else {
              this.setAlert('alert-danger alert-login', 'Erreur serveur', 13);
            }
            this.clone = true;
          },
          error => {
            console.log(error);
            this.clone = true;
          }
        );
    }
  }

  delBulletin(id) {
      if (confirm('Voulez-vous vraiment supprimer ? ')) {
          this.app.getData(`${envQNote.endpoint}BO/@Bulletin/delBulletin/${id}`)
            .pipe(first())
            .subscribe(
              data => {
                console.log(data);
                if (!data.crash) {
                  this.setAlert('alert-info alert-login', data.body.data.MESSAGE, 13);
                  this.getBulletinData();
                } else {
                    this.setAlert('alert-danger alert-login', 'Erreur serveur', 13);
                }
                this.clone = true;
              },
              error => {
                console.log(error);
                this.clone = true;
              }
            );
      }else{
      this.setAlert('alert-danger alert-login', 'Opération avortée', 13);
      this.router.navigate(['app/tools']);
      }
}


  showProfil() {
    this.setPage(4);
    this.getBulletinData();
  }

  initResults() {
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < this.period.bulletins.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (var j = 0; j < this.period.bulletins[i].results.length; j++) {
        if (this.period.bulletins[i].results[j].note) {
          this.period.bulletins[i].results[j].note = null;
        }
      }
    }
  }

   saveBulletinAndNext(token) {
    const json = JSON.stringify(this.period);
    // tslint:disable-next-line:max-line-length
    const data: FormData = new FormData();
    data.append('periode', json );
    this.app.setData(`${envQNote.endpoint}BO/@Bulletin/add`, data)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          console.log(data);
          if (!data.crash) {
            if (!data.body.data.ERROR) {
                  sessionStorage.setItem('PERIOD_DATA', null);
             } else {
               alert('Erreur Serveur');
            }
            this.setPage(0);
            this.router.navigate(['app/tools/' + token]);
          } else {
            if (data.code == 301 || data.code == '301' ) {
             this.logout();
              this.setPage(2);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  saveBulletin() {
    const json = JSON.stringify(this.period);
    // tslint:disable-next-line:max-line-length
    const data: FormData = new FormData();
    data.append('periode', json);
    data.append('domaine', this.period.etab.domaine);
    this.app.setData(`${envQNote.endpoint}BO/@Bulletin/add`, data)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          console.log(data);
          if (!data.crash) {
            if (!data.body.data.ERROR) {
              if (this.period.token_b == '' || this.period.token_b == null) {
                 this.router.navigate(['app/tools/' + data.body.data.DATA]);
                 } else {
                  this.period = data.body.data.DATA;
                  const dataj = JSON.stringify(this.period);
                  sessionStorage.setItem('PERIOD_DATA', dataj);
              }
            } else {
               alert('Erreur Serveur ');
            }
          } else {
            if (data.code === 301 || data.code === '301' ) {
             this.logout();
              this.setPage(2);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  changePass() {

    const jdata = JSON.stringify(this.change_pass);

    this.app.setData(`${envQNote.endpoint}BO/@Bulletin/changePass`, jdata)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (!data.crash) {
             this.setAlert('alert-info alert-login', data.body.data.MESSAGE, 14);
          } else if (this.change_pass.pass_1 !== this.change_pass.pass_2) {
            this.setAlert('alert-danger alert-login', 'La confirmation du mot de passe a echoué', 14);
          } else {
              this.setAlert('alert-danger alert-login', 'Erreur serveur', 14);
          }

        },
        error => {
          console.log(error);

        }
      );
  }

  changeName() {
    const jdata: FormData = new FormData();
    jdata.append('fullName', this.CUSER.fullName );
    jdata.append('phone', this.CUSER.phone);
    jdata.append('etab_name', this.CUSER.etab_name);
    this.app.setData(`${envQNote.endpoint}BO/@Bulletin/changeName`, jdata)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (!data.crash) {
            this.auth.setUserDataX(this.CUSER);
            this.setAlert('alert-info alert-login', data.body.data.MESSAGE, 15);
          } else {
              this.setAlert('alert-danger alert-login', 'Erreur serveur', 15);
          }
        },
        error => {
          console.log(error);

        }
      );
  }

   changeEmail() {
     this.change_email.email = this.CUSER.email;
     const jdata = JSON.stringify(this.change_email);

     this.app.setData(`${envQNote.endpoint}BO/@Bulletin/changeEmail`, jdata)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (!data.crash) {
            this.auth.setUserDataX(this.CUSER);
            this.setAlert('alert-info alert-login', data.body.data.MESSAGE, 16);
          } else {
              this.setAlert('alert-danger alert-login', 'Erreur serveur', 16);
          }

        },
        error => {
          console.log(error);

        }
      );
   }
  validerUser() {
    if (this.pin === this.CUSER.pin) {
       this.app.getData(`${envQNote.endpoint}BO/@Bulletin/valider/${this.pin}`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (!data.crash) {
            this.CUSER.valider_user = 1;
            this.auth.setUserDataX(this.CUSER);
            this.setAlert('alert-info alert-login', data.body.data.MESSAGE, 20);
           } else {
              this.setAlert('alert-danger alert-login', 'Erreur serveur', 20);
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
     this.setAlert('alert-danger alert-login', 'Pin non valide', 20);
    }
  }

ReformaterRes(){
this.period.bulletins = [];
this.period.users = this.period.users.sort();
this.period.cours = this.period.cours.sort();
this.setNoteToTal();
for (let i = 0; i < this.period.users.length; i++) {
   let r: Results[] = [];
    for (let j = 0; j < this.period.cours.length; j++) {
          let cours  = this.period.cours[j];
          const cr = this.period.annee + '-' + this.period.classe + '-' + this.period.name + '-' + cours.code + '-' + this.period.users[i].code;
           let nr = new Results(cr, cours, '');
          r.push(nr);
    }
    var b  = new Bulletin(this.period.users[i], r, this.period.coef);
    this.period.bulletins.push(b);
  }
}

ReformaterRes2(){
let blt = this.period.bulletins;
this.period.bulletins = [];
this.period.users = this.period.users.sort();
this.period.cours = this.period.cours.sort();
this.setNoteToTal();
for (let i = 0; i < this.period.users.length; i++) {
   let r: Results[] = [];
    for (let j = 0; j < this.period.cours.length; j++) {
          let cours  = this.period.cours[j];
           const cr = this.period.annee + '-' + this.period.classe + '-' + this.period.name + '-' + cours.code + '-' + this.period.users[i].code;
           let note = this.findNoteOfThisBl(blt,this.period.users[i].code,cours,cr);
           let nr = new Results(cr, cours,note);
           r.push(nr);
    }
    var b  = new Bulletin(this.period.users[i], r, this.period.coef);
    this.period.bulletins.push(b);
  }
}

findNoteOfThisBl(bt, cu, cours,cr){
    let note = 0;
    for (let x = 0; x < bt.length; x++) {
      if(bt[x].code && bt[x].code==cu){
        for (let y = 0; y < bt[x].results.length; y++) {
            if(bt[x].results[y].code == cr && bt[x].results[y].note <= cours.note_total){
                 note = bt[x].results[y].note
             }
        }
      }
    }
  return note;
}

setNoteToTal(){
    this.period.coef = 0;
    for (let j = 0; j < this.period.cours.length; j++) {
       let cours  = this.period.cours[j];
      if (cours.is_calc) {
         this.period.coef += cours.note_total;
       }
     }
}



}


