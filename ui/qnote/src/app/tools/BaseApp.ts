import { first } from 'rxjs/operators';
import { envQNote } from 'src/environments/environment.prod';

export abstract class BaseApp {
  public alert = { state: '', message: '', active: false, pos: -1 };
  public load = { active: false, pos: -1 };
  public website:any = envQNote.endpoint;
  public loading: any[] = [];
  i;
  constructor() {
    this.i = 10;
   }

  onPrint(divName: any) {
     const printContents = document.getElementById(divName).innerHTML;
     const originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
  }
  showLoading(state:boolean,pos:number) {
    this.load.active = state;
    this.load.pos = pos;
  }

  closeLoading() {
    this.load.active = false;
  }
  public  setAlert(state: any, message: any, pos: number= 1){
    this.alert.state = state;
    this.alert.active = true;
    this.alert.message = message;
    this.alert.pos = pos;
  }
  public  closeAlert(){
    this.alert.active = false;
  }
   public  setAlertDanger( message: any, pos: number= 1){
    this.alert.state = 'alert-danger alert-login';
    this.alert.active = true;
    this.alert.message = message;
    this.alert.pos = pos;
  }
  public  setAlertSuccess( message: any, pos: number= 1) {
    this.alert.state = 'alert-success alert-login';
    this.alert.active = true;
    this.alert.message = message;
    this.alert.pos = pos;
  }



  saveEntity(key:any, data:any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

   retrieveEntity(key: any) {
    JSON.parse(localStorage.getItem(key));
  }

   saveData(key:any, data:any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

   retrieveData(key : any) {
    return localStorage.getItem(key);
  }
   setBG() {
         return `url(assets/bg/bg_${this.i}.png)` ;
   }

 randomInt(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
 }
}
