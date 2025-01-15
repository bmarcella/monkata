import { Component, ElementRef, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { DatePipe } from '@angular/common';
import { User } from './User';
import { UntypedFormBuilder } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.css']
})
export class EditProfComponent implements OnInit {

  user: User;
  loading = false;
  nuser: User;
  response = { state: '', message: '', active: false };
  response2 = { state: '', message: '', active: false };
  response3 = { state: '', message: '', active: false };
  response4 = { state: '', message: '', active: false };
  response5 = { state: '', message: '', active: false };
  response6 = { state: '', message: '', active: false };
  response7 = { state: '', message: '', active: false };
  response8 = { state: '', message: '', active: false };
  response9 = { state: '', message: '', active: false };
  response10 = { state: '', message: '', active: false };
  response11 = { state: '', message: '', active: false };
  bsal = false;
  sal;
  ID: any;
  villes: any;
  docs: any;
  uploadForm: any;
  progress: any;
  currentFileUpload: any;
  email: any;
  lName;
  fName;
  nif;
  cin;
  pob;
  bnif = false;
  bcin = false;
  bpob = false;
  bemail = false;
  bname = false;
  @ViewChild('myInput',{static:true})
  myInputVariable: ElementRef;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, public nServ: AppService, private auth: AuthenticationService, public studServ: StudentsService) {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.nuser = new User();
   }

  onFileSelect(event: { target: { files: string | any[]; }; }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    this.progress = 0;
    this.currentFileUpload = this.uploadForm.get('profile').value;
    // tslint:disable-next-line:radix
    const id = this.nuser.code;
    const id_img = (this.nuser.id_img) ? this.nuser.id_img : 0 ;
    this.logo = undefined;
    // tslint:disable-next-line: radix
    const url = `${environment.apiUrl}uploadStudentImg?id=${id}&id_img=${id_img}`;
    this.nServ.upload(url, this.currentFileUpload).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.progress = false;
          const data: any = event.body;
          if (!data.crash) {
               this.nuser.avatar = data.data[0];
               this.nuser.id_img = data.data[1];
               this.setLogo(this.nuser.id_img);
               this.nuser.token =  this.user.token;
               this.auth.setUserData(this.nuser);
               this.reset();
          }
        }
      }
    );
  }

reset() {
    this.myInputVariable.nativeElement.value = "";
}

  ngOnInit() {
    this.user = this.auth.currentUserValue;
    this.user.date_de_naiss = this.setDate(this.user.date_de_naiss);
    this.getUser(this.user.id);
    this.getContext();
  }

  getUser(id: any) {
   this.studServ.getUserById(id)
       .pipe(first())
       .subscribe(data => {
         this.nuser = data;
         this.nuser.date_de_naiss = this.setDate(this.nuser.date_de_naiss);
         this.email = this.nuser.username;
         this.lName = this.nuser.lastName;
         this.fName = this.nuser.firstName;
         this.cin = this.nuser.cin;
         this.nif = this.nuser.nif;
         if (this.nuser.lieu_de_naiss) {
           this.pob = this.nuser.lieu_de_naiss.id;
         } else {
           this.pob = null;
         }
         this.sal = this.nuser.salairy;
         this.setLogo(this.nuser.id_img);
       }, error => {
       });
  }

  editEmail(email: any) {
      if (!this.loading && email !== undefined) {
      this.loading = true;
      let url = `${environment.apiUrl}editEmail`;
      const DATA = {
      username: email
    };
      this.nServ.setData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response2.active = true;
            this.loading = false;
            if (!data.crash) {
              data.data.token = this.user.token;
              this.nuser.username = email;
              this.auth.setUserData(data.data);
              this.response2.state = 'success';
              this.response2.message = 'Modification affectuée avec succès';
           } else {
              this.response2.state = 'danger';
              this.response2.message = data.message;
            }
          },
          error => {
            this.response2.active = true;
            this.response2.state = 'danger';
            this.response2.message = error;
            this.loading = false;
          }
        );
     }
  }
  editCin(o: any) {
    if (!this.loading && o !== '' && o !== undefined ) {
      this.loading = true;
      let url = `${environment.apiUrl}editCin`;
      const DATA = {
        cin: o
      };
      this.nServ.setData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response8.active = true;
            this.loading = false;
            if (!data.crash) {
              data.data.token = this.user.token;
              this.nuser.cin = o;
              this.response8.state = 'success';
              this.response8.message = 'Modification affectuée avec succès';
              this.auth.setUserData(data.data);
            } else {
              this.response8.state = 'danger';
              this.response8.message = data.message;
            }
          },
          error => {
            this.response8.active = true;
            this.response8.state = 'danger';
            this.response8.message = error;
            this.loading = false;
          }
        );
    }
  }
  editNif(e: any) {
    if (!this.loading && e !== '') {
      this.loading = true;
      let  url = `${environment.apiUrl}editNif`;
      const DATA = {
        nif: e
      };
      this.nServ.setData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response7.active = true;
            this.loading = false;
            if (!data.crash) {
              this.nuser.nif = e;
              this.response7.state = 'success';
              this.response7.message = 'Modification affectuée avec succès';
              data.data.token = this.user.token;
              this.auth.setUserData(data.data);
            } else {
              this.response7.state = 'danger';
              this.response7.message = data.message;
            }
          },
          error => {
            this.response7.active = true;
            this.response7.state = 'danger';
            this.response7.message = error;
            this.loading = false;
          }
        );
    }
  }
  editName(fName, lName) {
    if (!this.loading && fName!=="" && lName!=="") {
      this.loading = true;
      let  url = `${environment.apiUrl}editName`;
      this.nServ.setData(url, { firstName : fName, lastName : lName}).pipe(first())
        .subscribe(
          data => {
            this.response.active = true;
            this.loading = false;
            if (!data.crash) {
              data.data.token = this.user.token;
              this.nuser.firstName = fName;
              this.nuser.lastName = lName;
              this.response.state = 'success';
              this.response.message = 'Modification affectuée avec succès';
              this.auth.setUserData(data.data);
            } else {
              this.response.state = 'danger';
              this.response.message = data.message;
            }
          },
          error => {
            this.response.active = true;
            this.response.state = 'danger';
            this.response.message = error;
            this.loading = false;
          }
        );
    }
  }

  setDate(date: any) {
    const nd = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    return nd;
  }


  editIP(u: any) {
  if (!this.loading) {
      this.loading = true;
      const DATA = {
        date_de_naiss: u.date_de_naiss,
        sexe: u.sexe,
        nationalite: u.nationalite,
        etat_civil: u.etat_civil,
        adresse: u.adresse,
        phone: u.phone,
        hphone: u.hphone,
        reference: u.reference,
        nom_pere: u.nom_pere,
        nom_mere: u.nom_mere,
        fonction: u.fonction
      };
      const  url = `${environment.apiUrl}userEntities/${this.nuser.id}`;

      this.nServ.editData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response3.active = true;
            this.loading = false;
            //
            this.nuser.date_de_naiss = u.date_de_naiss;
            this.nuser.sexe = data.sexe;
            this.nuser.nationalite = data.nationalite;
            this.nuser.reference = data.reference;
            this.nuser.phone = data.phone;
            this.nuser.hphone = data.hphone;
            this.nuser.adresse = data.adresse;
            this.nuser.etat_civil = data.etat_civil;
            this.nuser.fonction = data.fonction;
            //
            this.nuser.token = this.user.token;
            this.auth.setUserData(this.nuser);
            //
            this.response3.state = 'success';
            this.response3.message = 'Modification affectuée avec succès';
          },
          error => {
            this.response3.active = true;
            this.response3.state = 'danger';
            this.response3.message = error;
            this.loading = false;
          }
        );

    }

  }

  editIA(u: any) {
    if (!this.loading) {
      this.loading = true;
      const DATA = {
        nom_ass:   u.nom_ass,
        phone_ass: u.phone_ass,
        email_ass: u.email_ass,
        adresse_ass: u.adresse_ass
      };
      const url = `${environment.apiUrl}userEntities/${this.nuser.id}`;

      this.nServ.editData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response9.active = true;
            this.loading = false;
            this.nuser.token = this.user.token;
            this.auth.setUserData(this.nuser);
            this.response9.state = 'success';
            this.response9.message = 'Modification affectuée avec succès';
          },
          error => {
            this.response9.active = true;
            this.response9.state = 'danger';
            this.response9.message = error;
            this.loading = false;
          }
        );

    }

  }

  editILE(u: any) {
    if (!this.loading) {
      this.loading = true;
      const DATA = {
        last_etab:  u.last_etab,
        last_moyen: u.last_moyen,
        last_year:  u.last_year,
      };
      const url = `${environment.apiUrl}userEntities/${this.nuser.id}`;
      this.nServ.editData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response11.active = true;
            this.loading = false;
            this.nuser.token = this.user.token;
            this.auth.setUserData(this.nuser);
            this.response11.state = 'success';
            this.response11.message = 'Modification affectuée avec succès';
          },
          error => {
            this.response11.active = true;
            this.response11.state = 'danger';
            this.response11.message = error;
            this.loading = false;
          }
        );
    }

  }


  editLN(u: any) {
    if (!this.loading) {
       this.loading = true;
       const url = `${environment.apiUrl}editPOB/${this.nuser.id}/${u}`;
       console.log(url);
       this.nServ.getData(url).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.response6.active = true;
            this.loading = false;
            this.nuser.lieu_de_naiss = data.data.lieu_de_naiss;
            this.pob = this.nuser.lieu_de_naiss.id;
            data.data.token = this.user.token;
            this.auth.setUserData(data.data);
            //
            this.response6.state = 'success';
            this.response6.message = 'Modification affectuée avec succès';
          },
          error => {
            this.response6.active = true;
            this.response6.state = 'danger';
            this.response6.message = error;
            this.loading = false;
          }
        );

    }

  }

  editSal(u: any) {
    if (!this.loading) {
      this.loading = true;
      const url = `${environment.apiUrl}editSal/${this.nuser.id}/${u}`;
      this.nServ.getData(url).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.response10.active = true;
            this.loading = false;
            if(!data.crash){
            this.nuser.salairy = u;
            data.data.token = this.user.token;
            this.auth.setUserData(data.data);
            //
            this.response10.state =   'success';
            this.response10.message = data.message;
            } else {
              this.response10.state = 'danger';
              this.response10.message = data.message;
            }
          },
          error => {
            this.response10.active = true;
            this.response10.state = 'danger';
            this.response10.message = error;
            this.loading = false;
          }
        );

    }

  }

  getContext() {
    this.nServ.getData(`${environment.apiUrl}context`)
      .pipe(first())
      .subscribe(
        data => {
          this.villes = data.data.vis;
          this.docs = data.data.nivs;
        },
        error => {
        }
      );

  }

  getImg(img: any) {
    return `${environment.resUrl}${img}`;
  }

 logo;
  setLogo(id){
     this.logo = (id!=null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
  }

getLocalImg(img: any) {
    return `assets/${img}`;
}

}
