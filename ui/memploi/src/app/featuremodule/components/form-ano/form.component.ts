import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
// import moment from 'moment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { Jobs } from 'src/app/shared/models/Jobs';
import { getURL } from 'src/environments/environment.prod';
import { EmploymentDomains, HaitiCities } from '../../../../../../../common/index/HaitiCities';
import { Val } from 'src/app/core/Validator';
@Component({
  selector: 'app-form-ano',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class FormAnoComponent {

  @Input()
  job: Jobs;

  @Input()
  type_cv: boolean;
  cities: string [] = HaitiCities;
  domaines:string [] =  EmploymentDomains;
  fmime = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  user: any;
  uInfo: any = {
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    city: "",
    domaine_1: "",
    exp_1: '',
    domaine_2: "",
    exp_2: '',
    domaine_3: "",
    exp_3: '',
    stage: true,
    relocate: true,
    benevolat: true,
    tokenRC:"",
    //
    salary_min: "",
    salary_max: "",
    country: "Haiti",
    niv_academique: "",
    type_emp: "",
  };

  countries = [{ value: "Haiti", label: "Haiti", code : "HT" }];
  educs : any = ["Diplome de fin d'etude secondaire", "Certificat", "Licence", "Maitrise", "Doctorat"];
  type_emp = ["Temps plein", "Temps partiel", "Freelance", "Contrat","Télétravail", "Stage", "Benevolat"];
   val : Val[]  = [
      {
       name : "city",
       mlength : 100,
       message: "Vous devez selectionner une ville.",
       mlmessage : "Ville ne doit pas depasser 100 characteres."
      },
      {
        name : "domaine_1",
        mlength : 255,
        message: "Vous devez selectionner un domaine.",
        mlmessage : "Domaine ne doit pas depasser 255 characteres."
      },
      {
        name : "exp_1",
        mlength : 255,
        message: "Vous devez ajouter  un domaine.",
        mlmessage : "Domaine ne doit pas depasser 255 characteres."
      },

    ];
  constructor(
    private auth: KeycloakService,
    private crud: CrudService,
    private aUI: AlertService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.user = this.auth.profil();
  }
  progress = 0;
  message: any;
  fileInfos: any;
  cv: any;
  lm: any;
  dc: any;
  init(){
    this.uInfo  = {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      city: "",
      domaine_1: "",
      exp_1: '',
      domaine_2: "",
      exp_2: '',
      domaine_3: "",
      exp_3: '',
      stage: true,
      relocate: true,
      benevolat: true,
      tokenRC:"",
      //
      salary_min: "",
      salary_max: "",
      country: "Haiti",
      niv_academique: "",
      type_emp: "",
    };

  }
  onFileSelectedCV(event) {
    this.cv = undefined;
    let msg = undefined;
    this.aUI.show({ active: false });
    const file = <File>event.target.files[0];
    if (!this.fmime.includes(file.type)) {
      console.error('File should be a pdf or a doc');
      msg = "Le CV doit être un PDF ou un Doc.";
    } else if (file.size > 2e+6) {
      msg = "Le CV est trop volumineux.(plus de 2MB).";
      console.error('File is too large. Over 2MB');
    } else {
      this.cv = file;
    }
    if(msg) this.aUI.show({ active: true, message: msg, type: "danger", pos: 'top-right' });
  }

  onFileSelectedLM(event) {
    this.lm = undefined;
    let msg = undefined;
    this.aUI.show({ active: false });
    const file = <File>event.target.files[0];
    if (!this.fmime.includes(file.type)) {
      msg = "La lettre de modivation doit être un PDF ou un Doc.";
      console.error('File should be a pdf or a doc');
    } else if (file.size > 2e+6) {
      msg = "La lettre de modivation est trop volumineuse .(plus de 2MB).";
      console.error('File is too large. Over 2MB');
    } else {
      this.lm = file;
    }
    if(msg) this.aUI.show({ active: true, message: msg, type: "danger", pos: 'top-right' });
    console.log(this.lm);
  }

  onFileSelectedDC(event) {
    this.dc = undefined;
    let msg = undefined;
    this.aUI.show({ active: false });
    const file = <File>event.target.files[0];
    if (!this.fmime.includes(file.type)) {
      msg = "Diplome/ Certificat doit être un PDF ou un Doc.";
      console.error('File should be a pdf or a doc');
    } else if (file.size > 2e+6) {
      msg = "Diplome/ Certificat est trop volumineuse .(plus de 2MB).";
      console.error('File is too large. Over 2MB');
    } else {
      this.dc = file;
    }
    if(msg) this.aUI.show({ active: true, message: msg, type: "danger", pos: 'top-right' });
  }

  async upload  (e){
    this.recaptchaV3Service.execute('importantAction').subscribe(async (token: string) => {
      this.uInfo.tokenRC = token;
      await this.add(e);
    },
    (error: string) => {
      console.log(error);
    });
  }


  add(e): void {
    this.progress = 0;
    const data = new FormData();
    data.append('cv', this.cv);
    data.append("lastName", this.uInfo.lastName);
    data.append("firstName", this.uInfo.firstName);
    data.append("email", this.uInfo.email);
    data.append("phone", this.uInfo.phone);
    let URL = getURL("memploi", "app/add");
    if (this.type_cv){
        data.append('lm', this.lm);
        data.append("email_job", this.job.email_to_apply);
        data.append("id_job", this.job.id.toString());
    } else {
        data.append("country", this.uInfo.country);
        data.append("city", this.uInfo.city);
        data.append("relocate", this.uInfo.relocate.toString());
        data.append("benevolat", this.uInfo.benevolat.toString());
        data.append("domaine_1", this.uInfo.domaine_1);
        data.append("exp_1", this.uInfo.exp_1);
        data.append("domaine_2", this.uInfo.domaine_2);
        data.append("exp_2", this.uInfo.exp_2);
        data.append("domaine_3", this.uInfo.domaine_3);
        data.append("exp_3", this.uInfo.exp_3);
        data.append("stage", this.uInfo.stage.toString());
        data.append("salary_min", this.uInfo.salary_min);
        data.append("salary_max", this.uInfo.salary_max);
        data.append("niv_academique", this.uInfo.niv_academique);
        data.append("type_emp", this.uInfo.type_emp);
        data.append('dc', this.dc);
        URL = getURL("memploi", "app/addFree");
    }
    data.append("tokenRC", this.uInfo.tokenRC);
    this.crud.upload(URL, data, e).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.init();
          this.cv = undefined;
          this.lm = undefined;
          this.dc = undefined;
          console.log(event);
          this.progress = undefined;
          this.message = event.body.message;
          const msg = 'Votre Cv a été ajouté avec succès!';
          this.aUI.show({ active: true, message: msg , type: "success", pos: 'top-right' });
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Une erreur est survenue!';
        }
        this.aUI.show({ active: true, message: this.message, type: "danger", pos: 'top-right' });
        // this.cv = undefined;
      });
  }

}
