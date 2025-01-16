import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from 'src/app/service/crud.service';
import { DefaultAppService } from 'src/app/service/default-app.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { getURL } from 'src/environments/environment.prod';
import { ServiceApp } from '../../../../../../../common/index/Frontend';
import { gWURL } from '../../../../../../auth/src/environments/environment.prod';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit{
  rep = {
    job: 0,
    post: 0,
    ad:0,
    view: 0,
  }
  app;
  categories: any = [];
  ents = [];
  cEnt: any;
  cApp: any;
  ei = 0;
  avatar: any;
  entToken: any;
  aEnt: any;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  modalReference;
  constructor(config: NgbModalConfig, private modalService: NgbModal, public dApp$: DefaultAppService, private crud: CrudService,  private auth: KeycloakService) {
    this.app = this.dApp$.getApp();
    this.getApp();
    this.getEnts();
    config.backdrop = 'static';
    config.keyboard = false;
 
  }
  ngOnInit(): void {
    this.auth.getLoginEnt().then ((t)=>{
      this.entToken =  t;
     // console.log(this.entToken);
      if(!t) this.modalReference = this.modalService.open(this.content, { centered: true });
      if (t) {
         this.getEnt();
         this.getCount();
      }
    });
  }

  public getCount() {
    let URL = getURL("users","entreprise/count");
    this.crud.get(URL).then((r) => {
     this.rep = r;
    }).catch((e) => console.log(e));
   URL = getURL("memploi","countEnt");
   this.crud.get(URL).then((r) => {
    this.rep.post = r.post;
    this.rep.job = r.job;
    this.rep.view = r.view;
    console.log("NEW_ENT: ",r);
   }).catch((e) => console.log(e));
  }
  public getEnt() {
    const URL = getURL("users","entreprise/get");
    this.crud.get(URL).then((r: any) => {
      this.aEnt = r;
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  public getApp() {
    this.crud.get(gWURL("applications")).then((r) => {
      console.log(r);
      let i = 0;
      Object.entries(r).forEach(([key, value]) => {
        if ((value as ServiceApp).show){
          if (i==0){
            i++;
            this.cApp = value;
          }
          this.categories.push(value);
        }
      });
    }).catch((e) => console.log(e));
  }

 

  ucw(name: string ){
    return name.toUpperCase();
  }

  public getEnts() {
    const URL = getURL("memploi","cv/entreprises");
    this.crud.get(URL).then((r: any) => {
     if (r.length!=0) {
      this.ents = r;
      this.cEnt = this.ents[this.ei];
      this.avatar = this.auth.getLogo(this.cEnt.id);
     }
      // console.log("DATA: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  setEnt(cEnt: any){
   this.cEnt = cEnt;
  }
  setApp(cApp: any){
    this.cApp = cApp;
  }
 
  Launch(e){
    const URL = getURL("users","entreprise/loginEnt/"+this.cEnt.id+"/"+this.cApp.name);
    this.crud.get(URL,e).then((r: any) => {
      // console.log("DATA: ",r);
      this.entToken = this.auth.LoginEnt(r);
      this.getEnt();
      this.modalReference.close();
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }


}
