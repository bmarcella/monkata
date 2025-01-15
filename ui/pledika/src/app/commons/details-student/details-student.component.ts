import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { first, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/_Services/app.service';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: any= false;
  selectedFile = null;
  changeImage = false;
  uploadForm: UntypedFormGroup;
  // /////
  ID: BigInteger;
  // USER: { firstName : string };
  USER:any;
  pos:any;

  response = { state: '', message: '', active: false };
  // tslint:disable-next-line: max-line-length
 // cparent = { nom: 'test 1', prof: ' test 2', phone: '50938151294 ', adresse: 'delmas ', resp: false, who_is: 'Mère' };
  cparent:any;
  parent =  { user: '', nom: 'test 1', prof: ' test 2', phone: '50938151294 ', adresse: 'delmas ', resp: false, who_is: 'Mère' };
  maladie = { user: null, gen: false, name: 'test', nom_medecin: 'Jean luc', hopital: 'Dash', tel: '50938151294', adresse: 'delmas 65' };
  cmaladie :any;
  pars: any;
  cid: any;
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, public studServ: StudentsService, public app: AppService) { }
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getUserById(this.ID);
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }



editParent(p,i) {
  this.cparent=p;
  this.cid = p.id;
  this.pos=i;
}

  editMaladie(p, i) {
    this.cmaladie= p;
    this.cid = p.id;
    this.pos = i;
  }

  getUserById(id) {
    this.studServ.getUserById(id)
      .pipe(first())
      .subscribe(data => {
          this.USER = data;
          this.setLogo(data.id_img);
      }, error => {
        return [];
      });

  }

 addParent() {
   this.parent.user = `${environment.apiUrl}userEntities/${this.ID}`;
   this.studServ.addParent(this.parent)
     .pipe(first())
     .subscribe(data => {
       console.log(data);
       this.USER.parent.push(data);
     }, error => {
       return [];
     });
 }

  saveParent() {
    const url = `${environment.apiUrl}parents/${this.cid}`;
    this.app.editData(url,this.cparent).pipe(first())
        .subscribe(
          data => {
           console.log(data);
            this.USER.parent[this.pos] = data;
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
          this.USER.parent.splice(i,1);
        },
        error => {
        }
      );
  }

 closeEditParent(){
  this.cparent=null;
 }

  addMal() {
    this.maladie.user = `${environment.apiUrl}userEntities/${this.ID}`;
    this.studServ.addMal(this.maladie)
      .pipe(first())
      .subscribe(data => {
        this.USER.maladies.push(data);
      }, error => {
        return [];
      });
  }

  saveMal() {
    this.studServ.editMal(this.maladie,this.cid)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        this.USER.maladies.push(data);
      }, error => {
        return [];
      });
  }



  delMaladie(id, i) {
    const url = `${environment.apiUrl}maladies/${id}`;
    this.app.delData(url).pipe(first())
      .subscribe(
        data => {
          this.USER.maladie.splice(i, 1);
        },
        error => {
        }
      );
  }

  closeEditMaladie() {
    this.cmaladie = null;
  }

logo;
setLogo(id){
     this.logo = (id!=null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
}

getLocalImg(img: any) {
    return `assets/${img}`;
}

}
