import { formatNumber } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { Lightbox } from 'ngx-lightbox';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { Type_Doc } from 'src/app/shared/models/Documents';
import { App_Reception } from 'src/app/shared/models/Jobs';
import { User_Cv } from 'src/app/shared/models/User_Cv';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  public routes = routes;
  public albumsOne: any = [];
  public albumsTwo: any = [];
  doc = {
  id_dip : undefined,
  id_cv : undefined,
  id_ct : undefined,
  id_lm: undefined,
  id_job : undefined
 }
 job: any;
 ent: any;
 id: any | undefined;
 docs: any = [];
 memploi = App_Reception.memploi;
 lien = App_Reception.lien;
 whatsapp = App_Reception.whatsapp;
 email = App_Reception.email;
 typeDocOptions = Object.values(Type_Doc);
 cvs: any = [];
 lms: any = [];
 certs : any = [];
 dips : any = [];
 logo: any;
 constructor(private auth: KeycloakService, private _lightbox: Lightbox, public router: Router, public act: ActivatedRoute, private crud: CrudService ) {

 }

 public getDocs() {
  const URL = getURL("memploi","cv/getAllDocs");
  this.crud.get(URL).then((r) => {
  this.docs = r;
  this.cvs = this.docs.filter((doc) => doc.type_doc==Type_Doc.cv);
  this.lms = this.docs.filter((doc) => doc.type_doc==Type_Doc.lettre_motivation);
  this.certs = this.docs.filter((doc) => doc.type_doc==Type_Doc.certificat);
  this.dips = this.docs.filter((doc) => doc.type_doc==Type_Doc.diplome);
  }).catch((e) => console.log(e));
}


  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getCompletion();
      this.getJob(this.id);
      this.getDocs();
      this.getMonCv();
    });
  }

  public getJob(id: any) {
    const URL = getURL("memploi","getJobById/"+id);
    this.crud.get(URL).then((r) => {
     console.log(r);
     this.job = r.job;
     this.doc.id_job = this.job.id;
     this.ent = r.entreprise;
     this.logo = this.auth.getLogo(this.ent.id);
     this.getCand();
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }
  open(index: number, albumArray: Array<any>): void {
    this._lightbox.open(albumArray, index);
  }
  openAll(albumArray: Array<any>): void {
    this._lightbox.open(albumArray);
  }

  close(): void {
    this._lightbox.close();
  }

  direction() {
    //
  }

  currency (num : any ){
    return  formatNumber(Number(num), 'en-US', '1.0-0')
  }
  cand : any;
  public apply(e) {
    const URL = getURL("memploi","cv/apply");
    this.crud.postRC(URL, this.doc, e).then((r) => {
    this.cand = r;
    }).catch((e) => console.log(e));
  }

  public getCand() {
    const URL = getURL("memploi","cv/candidature/"+this.job.id);
    this.crud.get(URL).then((r) => {
    this.cand = r[0];
    }).catch((e) =>
      console.log(e)
    );
  }
  ccand ;
  public getMonCv() {
    const URL = getURL("memploi","cv/getFull");
    this.crud.get(URL).then((r) => {
    this.ccand = r as User_Cv;
    }).catch((e) => console.log(e));
  }

  note : any = 0;
  public getCompletion() {
    const URL = getURL("memploi","cv/completion");
    this.crud.get(URL).then((r) => {
    this.note = r;
    // console.log(r);
    }).catch((e) => console.log(e));
  }

  getNote(){
    if(this.note==0) return 0;
    return Math.round((this.note.note / this.note.total ) * 100 );
  }
  filler = {
    email : "Ajouter votre email de contact",
    etudes : "Ajouter au moins une étude",
    language : "Ajouter au moins une langue parler",
    name : "Ajouter votre nom et prénom",
    phone : "Ajouter au moin un numero de téléphone",
    profLen : "Votre profil droit avoir au moins 200 characteres",
    skills : "Ajouter au moins une compétence",
    titreAndProfile : "Vous devez ajouter votre titre et profil",
    works : "Ajouter au moins une experiences de travails",
  };
  miss(key: any) {
    return this.filler[key];
  }

}
