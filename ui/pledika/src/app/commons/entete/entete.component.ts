 import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-entete",
  templateUrl: "./entete.component.html",
  styleUrls: ["./entete.component.css"],
})
export class EnteteComponent implements OnInit {
  @Input() etab;
  logo;
  constructor() {}

  ngOnInit() {
 }
  getLocalImg(img: any) {
    return `assets/logo/${img}`;
  }
  setLogo(id){
     return (id!=null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
  }
}
