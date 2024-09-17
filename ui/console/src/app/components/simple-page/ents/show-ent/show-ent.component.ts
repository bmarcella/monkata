import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { getURL } from 'src/environments/environment.prod';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-show-ent',
  templateUrl: './show-ent.component.html',
  styleUrl: './show-ent.component.scss'
})
export class ShowEntComponent {

  cEnt: any;
  avatar : any;
  progress: any;

  w: any = {
    name: '',
    country: '',
    etat: '',
    ville: '',
    rue: ''
  };

  adresse = {
    country : "",
    name : "",
    etat:"",
    ville: "",
    rue: ""
  }
  constructor( private auth: KeycloakService, private crud: CrudService, private aUI:  AlertService) {  }

  
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
    const URL = getURL("memploi","cv/changeLogo/"+this.cEnt.id);
        this.crud.upload(URL,data, e).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log(event);
              this.progress = undefined;
              this.message = event.body.message;
              this.aUI.show({ active : true, message: 'Logo modifié avec succès!' , type: "success", pos: 'top-right' });
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

  ngOnInit() {
   this.getEnt();
  }

  public getEnt() {
    const URL = getURL("users","entreprise/get");
    this.crud.get(URL).then((r: any) => {
      this.cEnt = r;
      this.avatar = this.auth.getLogo(this.cEnt.id);
      console.log("DATA: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  editEnt(e) {
    const URL = getURL("memploi","cv/editEntreprise/"+this.cEnt.id);
    this.crud.post(URL,this.cEnt, e).then((r: any) => {
    this.cEnt= r;
    console.log("DATA: ",r);
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }

  add:any = [];

  editAdresse(w, i, e) {
    const URL = getURL("memploi","cv/editAdresse/"+w.id);
    this.crud.post(URL,w, e).then((r: any) => {
    this.cEnt.adresses[i]=r;
    this.add[i] = false;
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }

  addAdresse(w, e) {
    const URL = getURL("memploi","cv/addAdresse/"+this.cEnt.id);
    this.crud.post(URL,w, e).then((r: any) => {
    this.cEnt.adresses.push(r);
    console.log("DATA: ",r);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }


  

}
