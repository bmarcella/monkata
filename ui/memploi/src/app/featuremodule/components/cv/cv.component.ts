import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { KeycloakService } from 'src/app/service/keycloak.service';

@Component({
  selector: 'app-mon-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent {
  @Input()
  ccand: any;
  user: any;
  constructor(

    private auth: KeycloakService,
  ) {
    this.user = this.auth.profil();
    console.log(this.user);
  }




}
