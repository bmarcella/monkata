import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
// import moment from 'moment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { Jobs } from 'src/app/shared/models/Jobs';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-form-ano',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class FormAnoComponent {

  @Input()
  job: Jobs;
   fmime = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  user: any;
  uInfo: any = {
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    tokenRC:""
  }
  constructor(
    private auth: KeycloakService,
    private crud: CrudService,
    private aUI: AlertService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.user = this.auth.profil();
    console.log(this.user);
  }
  progress = 0;
  message: any;
  fileInfos: any;
  cv: any;
  lm: any;
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
    console.log(this.cv);
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
    data.append('lm', this.lm);
    data.append("lastName", this.uInfo.lastName);
    data.append("firstName", this.uInfo.firstName);
    data.append("email", this.uInfo.email);
    data.append("phone", this.uInfo.phone);
    data.append("email_job", this.job.email_to_apply);
    data.append("id_job", this.job.id.toString());
    data.append("tokenRC", this.uInfo.tokenRC);
    const URL = getURL("memploi", "app/add");
    this.crud.upload(URL, data, e).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uInfo = {
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            tokenRC:""
          };
          this.cv = undefined;
          this.lm = undefined;
          console.log(event);
          this.progress = undefined;
          this.message = event.body.message;
          this.aUI.show({ active: true, message: 'Vous avez postuler a ce poste avec succès!', type: "success", pos: 'top-right' });
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
