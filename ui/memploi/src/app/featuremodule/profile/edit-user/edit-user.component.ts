import {
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { User_Cv } from 'src/app/shared/models/User_Cv';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public routes = routes;
  public toggleData = false;
  public toggle = false;
  public avatar: any;
  code : string ;
  pass = {
    newPassword: "",
    newPassword2: "",
    oldPassword: ""
  }

  user: any;
  cv!: User_Cv;
  constructor(private auth: KeycloakService, public router: Router, private route: ActivatedRoute, private crud: CrudService, private aUI:  AlertService){
    this.user = this.auth.profil();
    console.log("USER:", this.user);
    if(this.user) this.avatar = this.auth.getAvatar(this.user.id);
  }
  togglePassword() {
    this.toggleData = !this.toggleData;
  }
  icon() {
    this.toggle = !this.toggle;
  }

  ngOnInit(): void {
    this.getCv();
  }

  public getCv() {
    const URL = getURL("memploi","cv/get");
    this.crud.get(URL).then((r) => {
    this.cv = r as User_Cv;
    if(this.user) this.avatar = this.auth.getAvatar(r.id);
    }).catch((e) => console.log(e));
  }

  public approve(e: any) {
    const URL = getURL("memploi","cv/approveUser/"+this.code);
    this.crud.get(URL).then((r) => {
      if(!r.error){
        this.code = "";
        this.auth.approveUser();
        this.user.approuved = true;
        this.aUI.show({ active : true, message: 'Email validé avec succès!' , type: "success", pos: 'top-right' });
      } else {
        this.aUI.show({ active : true, message: "Vous avez entré un mauvais code de validation" , type: "danger", pos: 'top-right' });
      }
    }).catch((e) => {
      this.aUI.show({ active : true, message: e , type: "danger", pos: 'top-right' });
      console.log(e);

    } );
  }


  public SaveUserCV(e) {
    const URL = getURL("memploi","cv/edit");
    const user: Partial <User_Cv> = {
     firstName: this.cv.firstName,
     lastName : this.cv.lastName,
     sexe: this.cv.sexe,
     city : this.cv.city,
     country : this.cv.country,
     telephone_a : this.cv.telephone_a,
     telephone_b: this.cv.telephone_b,
     relocate :this.cv.relocate,
     nif : this.cv.nif,
     nin: this.cv.nin,
     passport: this.cv.passport
    };

    this.crud.post(URL, user, e).then((r) => {
      this.aUI.show({ active : true, message: 'Profil modifié avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) =>{
       this.aUI.show({ active : true, message: e  , type: "danger", pos: 'top-right' });
       console.log(e)
   });
  }

  progress: any ;
  message: any;
  fileInfos: any;
  selectedFile: any;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e:any) => {
     this.avatar = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
    this.upload(event);
    console.log(this.selectedFile);
  }

  upload(e): void {
    this.progress = 0;
    const data = new FormData();
    data.append('file', this.selectedFile);
    const URL = getURL("memploi","cv/changeAvatar");
        this.crud.upload(URL,data, e).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log(event);
              this.progress = undefined;
              this.message = event.body.message;
              this.aUI.show({ active : true, message: 'Avatar modifié avec succès!' , type: "success", pos: 'top-right' });
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


  public async changePassword(e : any) {
    if (this.pass.newPassword == "" ||  this.pass.newPassword2=="" || this.pass.newPassword=="" ) {
      this.aUI.show({ active : true, message: "Vous devez remplir tous les champs." , type: "danger", pos: 'top-right' });
      return;
    }
    if (this.pass.newPassword != this.pass.newPassword2) {
       this.aUI.show({ active : true, message: "Mot de passe non identique." , type: "danger", pos: 'top-right' });
       return;
    }
    const RURL = getURL("memploi","cv/refresh");
    await this.crud.get(RURL, e);

    const URL = getURL("memploi","cv/changePassword");
    this.crud.post(URL,this.pass, e).then((r) => {
      console.log(r);
      this.aUI.show({ active : true, message: r.message , type:r.type, pos: 'top-right' });
      this.pass = {
        newPassword: "",
        newPassword2: "",
        oldPassword: ""
      }
    }).catch((e) => {
      console.log(e);
    });
  }

}
