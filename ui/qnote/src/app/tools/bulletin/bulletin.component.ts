import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { envQNote } from 'src/environments/environment.prod';
import { BaseApp } from '../BaseApp';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent extends BaseApp  implements OnInit {
  @Input() acad: any;
  @Input() niv: any;
  bg = {
    year_bgen: "",
    name_bgen: "",
    niv_bgen: "",
    dom_bgen: ""
  }
  cbg: any;
  bgs : any = [];
  CUSER: any;
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
 }

  ngOnInit(): void {
    this.getAll()
  }


   getAll() {
      this.app.getData(`${envQNote.endpoint}BO/@BulletinGen/all`)
        .pipe(first())
        .subscribe(
          data => {
           //  console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                 this.bgs = data.body.data.DATA ;
              }
            }
          }, error => {
            console.log(error);
          }
      );
  }

  add() {
    this.closeAlert();
    if (this.bg.name_bgen != "" && this.bg.niv_bgen != "" && this.bg.year_bgen != "") {
   const data: FormData = new FormData();
      data.append('name_bgen', this.bg.name_bgen);
      data.append('niv_bgen', this.bg.niv_bgen);
      data.append('year_bgen', this.bg.year_bgen);
      data.append('dom_bgen', this.bg.dom_bgen);
      this.app.setData(`${envQNote.endpoint}BO/@BulletinGen/add`, data)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                   this.bgs.push(data.body.data.DATA);
                   this.setAlertSuccess(data.body.data.MESSAGE, 1);
                  this.bg = {
                  year_bgen: "",
                  name_bgen: "",
                  niv_bgen: "",
                  dom_bgen: ""
                 }
              } else {
               this.setAlertDanger(data.body.data.MESSAGE, 1);
            }
            } else {
               this.setAlertDanger("Erreur serveur", 1);
            }

          }, error => {
              console.log(error);
              this.setAlertDanger(error, 1);
          }
        );
    } else {
      this.setAlertDanger("Vous devez remplir tous les champs.", 1);
    }
  }
  page: any = 0;
  cbgo;
  bgos = [];
  index = [];
  open(obj: any) {
    this.cbgo = {
      bg: obj,
      bd: []
    };
    this.page = 1;
    this.getBulletinForThisBG();
  }

  closePage() {
      this.page = 0;
      this.cbgo = undefined;
  }
  getBulletinForThisBG() {
      const data: FormData = new FormData();
      data.append('name_bgen', this.cbgo.bg.name_bgen);
      data.append('niv_bgen',  this.cbgo.bg.niv_bgen);
      data.append('year_bgen', this.cbgo.bg.year_bgen);
      data.append('dom_bgen',  this.cbgo.bg.dom_bgen);
      data.append('token_bgen',this.cbgo.bg.token_bgen);
      this.app.setData(`${envQNote.endpoint}BO/@BulletinGen/getBulletinForThisBG/${this.cbgo.bg.id_bgen}`, data)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                 this.bgos = data.body.data.DATA;
                 this.cbgo.bd= data.body.data.BG ;
              }
            }
          }, error => {
            console.log(error);
          }
        );
  }
  del(tk: any,i:any) {
    if (confirm("Voulez-vous vraiment supprimer ce bulletin général")) {
        this.app.getData(`${envQNote.endpoint}BO/@BulletinGen/del/${tk}`)
        .pipe(first())
        .subscribe(
          data => {
            //console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                this.bgs.splice(i,1);
              }
            }
          }, error => {
            console.log(error);
          }
        );
     }
  }

  pos = -1;
  update(obj:any, i: any) {
    this.cbg = obj;
    this.pos = i;
  }

   closeEdit() {
    this.cbg = undefined
     this.pos = -1;
  }

    edit() {
    this.closeAlert();
    if (this.cbg.name_bgen != "" && this.cbg.niv_bgen != "" && this.cbg.year_bgen != "") {
   const data: FormData = new FormData();
      data.append('name_bgen', this.cbg.name_bgen);
      data.append('niv_bgen', this.cbg.niv_bgen);
      data.append('year_bgen', this.cbg.year_bgen);
      data.append('dom_bgen', this.cbg.dom_bgen);
      data.append('token_bgen', this.cbg.token_bgen);
      this.app.setData(`${envQNote.endpoint}BO/@BulletinGen/edit`, data)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                   this.bgs[this.pos] = data.body.data.DATA;
                   this.setAlertSuccess(data.body.data.MESSAGE, 1);
                   this.cbg = undefined;
              } else {
               this.setAlertDanger(data.body.data.MESSAGE, 1);
            }
            } else {
               this.setAlertDanger("Erreur serveur", 1);
            }

          }, error => {
              console.log(error);
              this.setAlertDanger(error, 1);
          }
        );
    } else {
      this.setAlertDanger("Vous devez remplir tous les champs.", 1);
    }
  }

  addBulletinToBG(obj:any,i:number, ia:number) {
    this.closeAlert();
     this.app.getData(`${envQNote.endpoint}BO/@BulletinGen/addBulletinToBG/${this.cbgo.bg.id_bgen}/${obj.id_bulletin}/${i}`)
        .pipe(first())
        .subscribe(
          data => {
           // console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                this.cbgo.bd.push(data.body.data.DATA);
                this.bgos.splice(ia,1);
                this.setAlertSuccess(data.body.data.MESSAGE,1);
              } else {
                  this.setAlertDanger(data.body.data.MESSAGE,1);
              }
            }
          }, error => {
            this.setAlertDanger(error,1);
            console.log(error);
          }
      );
  }

  removeBulletinToBG(item, i) {
    console.log(item);
    if (confirm("Voulez-vous vraiment retirer ce bulletin")) {

       this.closeAlert();
        this.app.getData(`${envQNote.endpoint}BO/@BulletinGen/delBulletinToBG/${item.id_bgb}`)
        .pipe(first())
        .subscribe(
          data => {
           // console.log(data);
            if (!data.crash) {
              if (!data.body.data.ERROR) {
                this.cbgo.bd.splice(i, 1);
                this.getBulletinForThisBG();
                this.setAlertSuccess(data.body.data.MESSAGE,2);
              } else {
                  this.setAlertDanger(data.body.data.MESSAGE,2);
              }
            }
          }, error => {
            this.setAlertDanger(error,2);
            console.log(error);
          }
      );

    }
  }

}


