import { Component, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
export type AlertUI = {
  active : boolean,
  message? : string,
  type?: string,
  pos?: string
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent  implements OnDestroy{
  AUI: AlertUI = {
    active : false,
  };
  $timer : any ;
  constructor(private $aUI:  AlertService){
    this.$aUI.UI.subscribe((ui:AlertUI)=>{
      console.log(ui);
      this.AUI = ui;
      if(ui.active)
      this.hide();
    });
  }
  ngOnDestroy(): void {
    this.$aUI.UI.unsubscribe();
  }

  hide() {
    this.$timer = setTimeout(()=> {
      this.AUI.active = false;
      clearTimeout(this.$timer);
    }, 2500);
  }
}
