import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultAppService {
  public dApp!: string;
  
  constructor() { }

  setApp(data: string){
    this.dApp = data;
  }

  getApp(){
    return this.dApp;
  }

}
