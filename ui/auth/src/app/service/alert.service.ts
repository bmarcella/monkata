/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertUI } from '../shared/components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public UI = new BehaviorSubject<AlertUI>({
    active: false,
  });
  constructor() { }

  show(data: AlertUI){
    console.log(data);
    this.UI.next({
      active: false,
    });
    setTimeout(()=> {
      this.UI.next(data);
    }, 500);

  }
}
