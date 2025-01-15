import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  cours = [];
  promo = [];
  user: any;

  constructor(public nServ: AppService, private auth: AuthenticationService) {
    this.user = this.auth.currentUserValue;
    this.setLogo(this.user.id_img)
  }

  ngOnInit() {
  }
  getImg(avatar): string {
    return `${environment.resUrl}${avatar}`;
  }
  logo;
  setLogo(id){
     this.logo = (id!=null) ? `${environment.apiUrl}getFiles/${id}` : false;
  }

getLocalImg(img: any) {
    return `assets/${img}`;
}

}
