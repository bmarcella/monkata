import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { Documents, Type_Doc } from 'src/app/shared/models/Documents';
import { Etudes, Type_etudes } from 'src/app/shared/models/Etudes';
import { Horaire_de_travail, Type_contrat } from 'src/app/shared/models/Jobs';
import { Language, LanguageSkills, Proficiency } from 'src/app/shared/models/LanguageSkills';
import { References } from 'src/app/shared/models/References';
import { Skills } from 'src/app/shared/models/Skills';
import { User_Cv } from 'src/app/shared/models/User_Cv';
import { Works_exp } from 'src/app/shared/models/Works_exp';
import { getURL } from 'src/environments/environment.prod';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserCvComponent implements OnInit {

  public routes = routes;
  public toggleData = false;
  public toggle = false;
  public avatar = "";
  name_doc: any ;
  works: Works_exp[] = [];
  etudes: Etudes[] = [];
  refs: References[] = [];

  skills: Skills[] = [];
  langs: LanguageSkills[] = [];
  docs: Documents[] = [];
  typeDocOptions = Object.values(Type_Doc);
  contratOptions = Object.values(Type_contrat);
  horaireOptions = Object.values(Horaire_de_travail);
  typeEtudesOptions = Object.values(Type_etudes);
  langOptions = Object.values(Language);
  profOptions = Object.values(Proficiency);
  expOptions = ["Moins que un an", "1 a 3 ans", " 3 a 5 ans", " 5  a 10 ans", "10 ans et plus"]
  ph_prof : any = "Exemple : Comptable Junior dynamique ...";
  user: any;
  cv: any;

  selectedLang: any ;
  selectedProf: any ;
  selectedSkill: any ;
  selectedExp: any ;
  selectedTypeDoc: any;
  selectedFile: any;
  path  = 0;


  constructor(private auth: KeycloakService, public router: Router, private route: ActivatedRoute, private crud: CrudService, private aUI:  AlertService){
    this.user = this.auth.profil();
    if(this.user) this.avatar = this.auth.getAvatar(this.user.id);
  }

  switcher(name: any){
    this.path = name;
    if(name==6){
      this.getMonCv();
    }
  }
  ccand: any;
  public getMonCv() {
    const URL = getURL("memploi","cv/getFull");
    this.crud.get(URL).then((r) => {
    this.ccand = r as User_Cv;
    }).catch((e) => console.log(e));
  }


  togglePassword() {
    this.toggleData = !this.toggleData;
  }
  icon() {
    this.toggle = !this.toggle;
  }

  ngOnInit(): void {
    this.getCv();
    this.getDocs();
  }


  public getDocs() {
    const URL = getURL("memploi","cv/getAllDocs");
    this.crud.get(URL).then((r) => {
    this.docs = r;
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public getCv() {
    const URL = getURL("memploi","cv/getFull");
    this.crud.get(URL).then((r) => {
    this.cv = r as User_Cv;
    this.works = r.worksExp;
    this.etudes = r.etudes;
    this.refs =   r.references;
    this.langs =  r.languageSkills;
    this.skills = r.skills;
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public addWork(e: any) {
    const URL = getURL("memploi","cv/addEmptyWork");
    this.crud.get(URL, e).then((r) => {
    this.works.unshift(r as Works_exp);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public delWork(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/delWork/"+w.id);
    this.crud.get(URL, e).then((r) => {
    this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
    this.works.splice(this.works.findIndex(function(i){
      return i.id === w.id;
    }), 1);
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }

  public editWork(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/editWork");
    this.crud.post(URL,w, e).then((r) => {
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }


  public addEtude(e: any) {
    const URL = getURL("memploi","cv/addEmptyEtude");
    this.crud.get(URL,e).then((r) => {
    this.etudes.unshift(r as Etudes);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public delEtude(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/delEtude/"+w.id);
    this.crud.get(URL, e).then((r) => {
    this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
    this.etudes.splice(this.etudes.findIndex(function(i){
      return i.id === w.id;
    }), 1);
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }

  public editEtude(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/editEtude");
    this.crud.post(URL,w, e).then((r) => {
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }

  public addRef(e: any) {
    const URL = getURL("memploi","cv/addEmptyRef");
    this.crud.get(URL,e).then((r) => {
    this.refs.unshift(r as References);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public delRef(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/delRef/"+w.id);
    this.crud.get(URL, e).then((r) => {
    this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
    this.refs.splice(this.refs.findIndex(function(i){
      return i.id === w.id;
    }), 1);
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }

  public editRef(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/editRef");
    this.crud.post(URL,w, e).then((r) => {
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }

  public addLang(e: any) {
    const URL = getURL("memploi","cv/addLang");
    this.crud.post(URL,{ name: this.selectedLang, prof : this.selectedProf }, e).then((r) => {
    this.langs.unshift(r as LanguageSkills);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public delLang(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/delLang/"+w.id);
    this.crud.get(URL, e).then((r) => {
    this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
    this.langs.splice(this.langs.findIndex(function(i){
      return i.id === w.id;
    }), 1);
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }

  public addSkill(e: any) {
    if(this.skills.length > 9 ) {
      this.aUI.show({ active : true, message: "Vous pouvez ajouter que 10 compétences." , type: "danger", pos: 'top-right' });
      return;
    }
    const URL = getURL("memploi","cv/addSkill");
    this.crud.post(URL,{ name: this.selectedSkill, exp : this.selectedExp }, e).then((r) => {
    this.selectedSkill = "";
    this.selectedExp = "";
    this.skills.unshift(r as LanguageSkills);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public delSkill(w: any, i: number, e: any ) {
    const URL = getURL("memploi","cv/delSkill/"+w.id);
    this.crud.get(URL, e).then((r) => {
    this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
    this.skills.splice(this.skills.findIndex(function(i) {
      return i.id === w.id;
    }), 1);
    }).catch((e) =>{
    this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
    console.log(e);
    });
  }





  clearDoc(){
    this.selectedFile  = undefined;
  }


  getImg(mime?: any){
    let f = 0;
    const docs = ["docx", "jpg", "pdf"];
    try {
      const end = mime.split("/")[1];
      switch(end){
          case 'pdf' :
          f = 2;
          break;
          case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
          f = 0;
          break;
          default:
          f = 1;
          break;
      }
    } catch (error) {
      return docs[0]+".png";
    }
    return docs[f]+".png";
  }

  progress: any ;

  message: any;
  fileInfos: any;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadDoc(e): void {
    this.progress = 0;
    const data = new FormData();
    data.append('type_doc', this.selectedTypeDoc);
    data.append('name', this.name_doc);
    data.append('file', this.selectedFile);
    const URL = getURL("memploi","cv/addDoc");
        this.crud.upload(URL,data, e).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.name_doc = "";
              this.progress = 0;
              this.message = event.body.message;
              this.selectedFile = undefined;
              this.aUI.show({ active : true, message: 'Fichier televersé  avec succès!' , type: "success", pos: 'top-right' });
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.aUI.show({ active : true, message: this.message  , type: "danger", pos: 'top-right' });
            this.selectedFile = undefined;
          });
  }



  public SaveUserCV(e) {
    const URL = getURL("memploi","cv/edit");

    const user: Partial <User_Cv> = {
      title_prof: this.cv.title_prof,
      profile : this.cv.profile,
    };

    this.crud.post(URL, user, e).then((r) => {
      this.aUI.show({ active : true, message: 'Profil modifié avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) =>{
      this.aUI.show({ active : true, message: e , type: "success", pos: 'top-right' });
      console.log(e)
    });
  }

  public delDoc(w: any, i: number, e: any ) {
        const URL = getURL("memploi","cv/delDoc/"+w.id);
        this.crud.get(URL, e).then((r) => {
        this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
        this.docs.splice(this.docs.findIndex(function(i) {
          return i.id === w.id;
        }), 1);
        }).catch((e) =>{
        this.aUI.show({ active : true, message:e , type: "danger", pos: 'top-right' });
        console.log(e);
        });
  }



}
