import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  query;
  user: any;
  nots:any=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private app: AppService,
    @Inject(DOCUMENT) private document: Document
  ) {
     this.user = this.authenticationService.currentUserValue;
 }

  ngOnInit() {
   this.etab  = JSON.parse(localStorage.getItem('etab'));
   if (this.etab.id_img && this.etab.id_img != null) {
       this.setLogo(this.etab.id_img);
   }
   this.getNot();
  }

etab;

reload(){
 location.reload();
}

  getNot() {
    this.app.getData(`${environment.apiUrl}getNot`)
      .pipe(first())
      .subscribe(
        data => {
        if(!data.crash){
          this.nots = data.data;
        }
        },
        error => {
        }
      );
  }

 logout() {
   this.authenticationService.logout();
   this.app.getData(`${environment.apiUrl}logout`)
     .pipe(first())
     .subscribe(
       data => {
         this.router.navigate(['/app/login']);
       },
       error => {
         this.router.navigate(['/app/login']);
       }
     );
 }

 getImg(avatar): string {
   return `${environment.resUrl}${avatar}`;
 }

  logo;
  setLogo(id) {
     this.logo = (id!=null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
  }

  async goToPOC(){
  let name ="localhost";
  if (environment.production) {
       name = localStorage.getItem('url_backend');
    } else {
       name = environment.host;
    }
   this.document.location.href = `${environment.poc}plogin/${name}/${this.user.token}`;
   // this.document.location.href = `${environment.poc}${nom}/${this.user.token}`;
 }



}
