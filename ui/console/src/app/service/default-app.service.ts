import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultAppService {
  public dApp: string;
  constructor() { }

  setApp(data: string){
    this.dApp = data;
  }

  getApp(){
    return this.dApp;
  }

}
