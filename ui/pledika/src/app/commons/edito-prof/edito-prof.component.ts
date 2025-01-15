import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../edit-prof/User';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-edito-prof',
  templateUrl: './edito-prof.component.html',
  styleUrls: ['./edito-prof.component.css']
})
export class EditoProfComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, public app: AppService, public nServ: AppService, public studServ: StudentsService) {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.nuser = new User();
  }

  user: User;
  loading = false;
  nuser: User;
  code;
  response =  { state: '', message: '', active: false };
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
  response13 = { state: '', message: '', active: false };
  response14 = { state: '', message: '', active: false };
  response15 = { state: '', message: '', active: false };
  response16 = { state: '', message: '', active: false };
  response17 = { state: '', message: '', active: false };
  response18 = { state: '', message: '', active: false };
  response20 = { state: '', message: '', active: false };
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
  aloading: boolean;
  cparent: any;
  parent =  { user: '', nom: '', prof: '', phone: '', adresse: '', resp: false, who_is: '' };
  maladie = { user: null, gen: false, name: '', nom_medecin: '', hopital: '', tel: '', adresse: '' };
  cmaladie: any;
  pars: any;
  cid: any;
  pos: any;
  logo;
  @ViewChild('myInput', {static: true})
  myInputVariable: ElementRef;


  child;

  payAdmis() {
    this.aloading = true;
    this.studServ.payByUserId(this.nuser.id)
      .pipe(first())
      .subscribe(data => {
        this.aloading = false;
        this.response13.active = true;
        this.response13.message = data.message;
        if (!data.crash) {
          this.response13.state = 'success';
          this.nuser = data.data;
        } else {
          this.response13.state = 'danger';
        }
      }, error => {
        this.aloading = false;
        this.response13.active = true;
        this.response13.state = 'danger';
        this.response13.message = error;
      });

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
               this.reset();
          }
        }
      }
    );
  }

reset() {
    this.myInputVariable.nativeElement.value = '';
}

 setLogo(id) {
     this.logo = (id != null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
  }

getLocalImg(img: any) {
    return `assets/${img}`;
}

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getUser(this.ID);
    this.getContext();
  }

  getUser(id: any) {
    this.studServ.getUserById(id)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
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
        this.getChild();
      }, error => {
      });
  }

  editEmail(email: any) {
    if (!this.loading && email !== undefined) {
      this.loading = true;
      const url = `${environment.apiUrl}editEmail/${this.ID}`;
      const DATA = {
        username: email
      };
      this.nServ.setData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response2.active = true;
            this.loading = false;
            if (!data.crash) {
              this.nuser.username = email;
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
    if (!this.loading && o !== '' && o !== undefined) {
      this.loading = true;
      // tslint:disable-next-line:one-variable-per-declaration
      const url = `${environment.apiUrl}editCin/${this.ID}`;
      const DATA = {
        cin: o
      };
      this.nServ.setData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response8.active = true;
            this.loading = false;
            if (!data.crash) {
              this.nuser.cin = o;
              this.response8.state = 'success';
              this.response8.message = 'Modification affectuée avec succès';
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
  editNif(email: any) {
    if (!this.loading && email !== '') {
      this.loading = true;
      const url = `${environment.apiUrl}editNif/${this.ID}`;
      const DATA = {
        nif: email
      };
      this.nServ.setData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response7.active = true;
            this.loading = false;
            if (!data.crash) {
              this.nuser.nif = email;
              this.response7.state = 'success';
              this.response7.message = 'Modification affectuée avec succès';
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
    if (!this.loading && fName !== '' && lName !== '') {
      this.loading = true;
      const  url = `${environment.apiUrl}editName/${this.ID}`;
      this.response.active = false;
      this.nServ.setData(url, this.nuser).pipe(first())
        .subscribe(
          data => {
            this.response18.active = true;
            this.loading = false;
            if (!data.crash) {
              this.nuser.firstName = fName;
              this.nuser.lastName = lName;
              this.response18.state = 'success';
              this.response18.message = 'Modification affectuée avec succès';
            } else {
              this.response18.state = 'danger';
              this.response18.message = data.message;
            }
          },
          error => {
            this.response18.active = true;
            this.response18.state = 'danger';
            this.response18.message = error;
            this.loading = false;
          }
        );
    }
  }

  setDate(date: any) {
    const nd = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    return nd;
  }

  editBourse() {
    if (!this.loading) {
        this.loading = true;
        const url = `${environment.apiUrl}editBourse/${this.nuser.id}/${this.nuser.granted}`;
        this.nServ.getData(url).pipe(first())
          .subscribe(
            data => {
              this.response16.active = true;
              this.loading = false;
              this.response16.state = 'success';
              this.response16.message = 'Modification affectuée avec succès';
            },
            error => {
              this.response16.active = true;
              this.response16.state = 'danger';
              this.response16.message = error;
              this.loading = false;
            }
          );

      }
  }

  editExc(etat) {
    if (!this.loading) {
      this.loading = true;
      const url = `${environment.apiUrl}editExc/${this.nuser.id}/${etat}`;
      this.nServ.getData(url).pipe(first())
        .subscribe(
          data => {
            this.response17.active = true;
            this.loading = false;
            this.response17.message = data.message;
            if (!data.crash) {
              this.nuser.exclude = etat;
              if (etat) {
                 this.nuser.enabled = !etat;
              }
              this.response17.state = 'success';
             } else {
              this.response17.state = 'danger';
           }
          },
          error => {
            this.response17.active = true;
            this.response17.state = 'danger';
            this.response17.message = error;
            this.loading = false;
          }
        );

    }
  }

  editEtat(etat) {
    if (!this.loading) {
      this.loading = true;
      const url = `${environment.apiUrl}editEtat/${this.nuser.id}/${etat}`;
      this.nServ.getData(url).pipe(first())
        .subscribe(
          data => {
            this.response17.active = true;
            this.loading = false;
            this.response17.message = data.message;
            if (!data.crash) {
              this.nuser.enabled = etat;
              this.response17.state = 'success';
             } else {
              this.response17.state = 'danger';
           }
          },
          error => {
            this.response17.active = true;
            this.response17.state = 'danger';
            this.response17.message = error;
            this.loading = false;
          }
        );

    }
  }

  editIP(u: any) {
    console.log(u);
    if (!this.loading) {
     if (u.date_de_naiss !== undefined) {
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
         fonction: u.fonction,
         identifiant: u.identifiant,
         matricule: u.matricule,
         bank_account_HTG: u.bank_account_HTG,
         bank_account_USD: u.bank_account_USD,
         orphelin: u.orphelin,
         religion: u.religion,
         pin : u.pin
       };
       const url = `${environment.apiUrl}userEntities/${this.nuser.id}`;
       this.nServ
         .editData(url, DATA)
         .pipe(first())
         .subscribe(
           (data) => {
             //
             this.nuser.date_de_naiss = u.date_de_naiss;
             this.nuser.sexe = data.sexe;
             this.nuser.nationalite = data.nationalite;
             this.nuser.reference = data.reference;
             this.nuser.phone = data.phone;
             this.nuser.hphone = data.hphone;
             this.nuser.adresse = data.adresse;
             this.nuser.etat_civil = data.etat_civil;
             //
             this.response3.active = true;
             this.loading = false;
             this.response3.state = 'success';
             this.response3.message = 'Modification affectuée avec succès';
           },
           (error) => {
             this.response3.active = true;
             this.response3.state = 'danger';
             this.response3.message = error;
             this.loading = false;
           }
         );
     } else {
       this.response3.active = true;
       this.response3.state = 'danger';
       this.response3.message = 'Veuillez remplir tous les champs [date de naissance]';
       this.loading = false;
     }
    }

  }

  editIA(u: any) {
    if (!this.loading) {
      this.loading = true;
      const DATA = {
        nom_ass: u.nom_ass,
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

update() {
  if (this.parent.who_is === 'Mère') {
    this.parent.nom = this.nuser.nom_mere;
  } else if (this.parent.who_is === 'Père') {
    this.parent.nom = this.nuser.nom_pere;
  } else {
    this.parent.nom = '';
  }
}

mupdate() {
  if (this.cparent.who_is === 'Mère') {
    this.cparent.nom = this.nuser.nom_mere;
  } else if (this.cparent.who_is === 'Père') {
    this.cparent.nom = this.nuser.nom_pere;
  } else {
    this.cparent.nom = '';
  }
}

  editILE(u: any) {
    if (!this.loading) {
      this.loading = true;
      const DATA = {
        last_etab: u.last_etab,
        last_moyen: u.last_moyen,
        last_year: u.last_year,
      };
      const url = `${environment.apiUrl}userEntities/${this.nuser.id}`;

      this.nServ.editData(url, DATA).pipe(first())
        .subscribe(
          data => {
            this.response11.active = true;
            this.loading = false;
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
      const url = `${environment.apiUrl}editPOB/${this.nuser.id}/${u.id}`;
      this.nServ.getData(url).pipe(first())
        .subscribe(
          data => {
            this.editPOB(u.name);
            this.response6.active = true;
            this.loading = false;
            this.nuser.lieu_de_naiss = data.data.lieu_de_naiss;
            this.pob = this.nuser.lieu_de_naiss.id;
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
editPOB(name) {
    const url = `${environment.apiUrl}userEntities/${this.nuser.id}`;
    this.nServ.editData(url, {pob: name})
      .pipe(first())
      .subscribe(data => {
        this.nuser.pob = name;
      }, error => {

      });
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
            this.response10.message = data.message;
            this.loading = false;
            if (!data.crash) {
              this.response10.state = 'success';
            } else {
              this.response10.state = 'danger';
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


  addParent() {
    this.parent.user = `${environment.apiUrl}userEntities/${this.ID}`;
    this.studServ.addParent(this.parent)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        this.nuser.parent.push(data);
      }, error => {
        return [];
      });
  }

  saveParent() {
    const url = `${environment.apiUrl}parents/${this.cid}`;
    this.app.editData(url, this.cparent).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.nuser.parent[this.pos] = data;
          this.closeEditParent();
        },
        error => {
          console.log(error);
        }
      );
  }

  delParent(id, i) {
    const url = `${environment.apiUrl}parents/${id}`;
    this.app.delData(url).pipe(first())
      .subscribe(
        data => {
          this.nuser.parent.splice(i, 1);
        },
        error => {
        }
      );
  }

  closeEditParent() {
    this.cparent = null;
  }

  addMal() {
    this.maladie.user = `${environment.apiUrl}userEntities/${this.ID}`;
    this.studServ.addMal(this.maladie)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        this.nuser.maladies.push(data);
      }, error => {
        return [];
      });
  }

  saveMal() {
    this.studServ.editMal(this.maladie, this.cid)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        this.nuser.maladies.push(data);
      }, error => {
        return [];
      });
  }



  delMaladie(id, i) {
    const url = `${environment.apiUrl}maladies/${id}`;
    this.app.delData(url).pipe(first())
      .subscribe(
        data => {
          this.nuser.maladies.splice(i, 1);
        },
        error => {
        }
      );
  }

  closeEditMaladie() {
    this.cmaladie = null;
  }

  editParent(p, i) {
    this.cparent = p;
    this.cid = p.id;
    this.pos = i;
  }

  editMaladie(p, i) {
    this.cmaladie = p;
    this.cid = p.id;
    this.pos = i;
  }
  getChild() {
    const id =  this.ID;
    const url = `${environment.apiUrl}getStudentForParent/${id}`;
    this.app.getData(url).pipe(first())
      .subscribe(
        data => {
          this.child = data.data;
        },
        error => {
        }
      );
  }

 addChild(code) {
    const id =  this.ID;
    const etat = (this.nuser.sexe === 'M') ? 1 : 2;
    code = code.toUpperCase();
    const url = `${environment.apiUrl}setChild/${id}/${code}/${etat}`;
    this.app.getData(url).pipe(first()).subscribe(
        data => {
              console.log(data);
              this.response20.active = true;
              this.loading = false;
              this.response20.state = 'success';
              this.response20.message = 'succès';
              this.getChild();
        },
        error => {
              this.response20.active = true;
              this.loading = false;
              this.response20.state = 'danger';
              this.response20.message = 'erreur';
              this.getChild();
        }
      );
  }

delChild(id, i ) {
    // tslint:disable-next-line:no-conditional-assignment
    const etat = (this.nuser.sexe = 'M') ? 1 : 2;
    let data = {};
    if (etat) {
      data = { pere_id : null} ;
     } else  {
      data = { mere_id : null} ;
     }
    const url = `${environment.apiUrl}userEntities/${id}`;
    this.app.editData(url, data).pipe(first())
      .subscribe(
        data => {
          this.child.splice(i, 1);
        },
        error => {
        }
      );
  }



}
