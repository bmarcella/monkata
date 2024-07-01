import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { envQNote } from 'src/environments/environment.prod';
import { BaseApp } from '../BaseApp';
import { Period } from '../models/Period';
import { Acad } from '../models/Gen/Acad';

@Component({
  selector: 'app-tleft',
  templateUrl: './tleft.component.html',
  styleUrls: ['./tleft.component.css']
})
export class TleftComponent  extends BaseApp implements OnInit {

  @Input() period: Acad;
  @Input() tools;
  @Input() fragment: any;
  @Output() ouser: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeHeigth: EventEmitter<any> = new EventEmitter<any>();
  isSlide = false;
  constructor(private app: AppService, private auth: AuthenticationService, ) {
    super();
  }

  ngOnInit(): void {
  }
  changeHeight(e: any) {
    console.log(e);
     window.dispatchEvent(new Event('changeHeight'));
  }
  modelChanged($e) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.period.bulletins.length; i++) {
      this.period.bulletins[i].total_note = parseFloat($e);
     }
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.period.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }
  save() {
    this.saveEvent.emit();
  }
changePotrait(e){
  var h = this.period.etab.height;
  var w =this.period.etab.width
  this.period.etab.width = h;
  this.period.etab.height = w;
  window.dispatchEvent(new Event('resize'));
  // this.changeHeigth.emit();
}

}
