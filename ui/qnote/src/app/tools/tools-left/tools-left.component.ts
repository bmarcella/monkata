import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { first } from 'rxjs/operators';
import {
  AuthenticationService,
} from 'src/app/_Services/Authentification.service';
import { envQNote } from 'src/environments/environment.prod';

import { AppService } from '../../_Services/app.service';
import { BaseApp } from '../BaseApp';
import { Period } from '../models/Period';

@Component({
  selector: 'app-tools-left',
  templateUrl: './tools-left.component.html',
  styleUrls: ['./tools-left.component.css']
})
export class ToolsLeftComponent  extends BaseApp implements OnInit {
  @Input() period: Period | any;
  @Input() tools;
  @Input() acad: any;
  @Input() niv: any;
  @Input() fragment: any;
  @Output() ouser: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeHeigth: EventEmitter<any> = new EventEmitter<any>();
  isSlide = false;
  e: number = 5;
  c: any= 0.6;
  constructor(private app: AppService, private auth: AuthenticationService, ) {
    super();
  }

  changeHeight(e: any) {
     window.dispatchEvent(new Event('changeHeight'));
  }

  ngOnInit(): void {
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
 pay() {
      this.app.getData(`${envQNote.endpoint}BO/@Bulletin/pay/${this.period.token_b}`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (!data.crash) {
            if (!data.body.data.ERROR) {
              this.setAlert('alert-info alert-login', 'Paiement effectué avec succès', 10);
              this.period = data.body.data.DATA.period;
              const dataj = JSON.stringify(this.period);
              sessionStorage.setItem('PERIOD_DATA', dataj);
              this.auth.setUserDataX(data.body.data.DATA.user);
              this.ouser.emit(data.body.data.DATA);
              } else {
                this.setAlert('alert-danger alert-login', data.body.data.MESSAGE, 10);
                if(data.body.data.CODE==201){
                     this.period = data.body.data.DATA;
                }
              }
          }
        }, error => {
           console.log(error);
        }
      );
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


