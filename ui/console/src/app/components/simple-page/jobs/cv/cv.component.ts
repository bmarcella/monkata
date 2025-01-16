import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
// import moment from 'moment';
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

  @Input()
  showBtnDL;

  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;
  pdfName: any;


  constructor(
    private auth: KeycloakService,
  ) {
    this.user = this.auth.profil();
    console.log(this.user);
  }

  public downloadAsPdf(): void {
      const width =  this.dataToExport.nativeElement.clientWidth;
      const height = this.dataToExport.nativeElement.clientHeight;
      const orientation: any = 'p';
      const imageUnit = 'pt';
      domToImage.toPng(this.dataToExport.nativeElement, {
      quality: 0.95 ,
      width:  width,
      height: height,
      style: {
        //transform: 'scale('+scale+') translateX(-5%)',
        //transformOrigin: 'top left'
      }
      }).then(result => {
        
        //const jsPdfOptions =
      const pdf = new jsPDF({
        orientation: orientation,
        unit: imageUnit,
        format: [(width/1.618) + 50, (height/1.618)+220]
      });
      // format: [width + 50, height + 220]
      // pdf.setFontSize(48);
      // pdf.setTextColor('#2585fe');
      // pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
      // pdf.setFontSize(24);
      // pdf.setTextColor('#131523');
      // pdf.text('Report date: ' + moment().format('ll'), 25, 115);
      pdf.addImage(result, 'PNG', 25, 185, (width/1.618), (height/1.618));
      pdf.save('file_name'+ '.pdf');
      }).catch(error => {
        console.log(error);
      });
  }




}
