import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getURL } from 'src/environments/environment.prod';

import { Login } from '../../../../../common/dto/Login';
import { UserReg } from '../shared/models/UserReg';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {



  isLog = false;
  ss = "auth";
  serv = "users"

  constructor(private http: HttpClient, private store: StorageService) {
    const _tk = this.store.get("_token");
    if (_tk) this.isLog = true;
  }


  isLoggedIn() {
    const _tk = this.store.get("_token") ;
    return _tk && this.isLog;
  }

  profil() {
    const _user = this.store.getJson("_profil");
    if (!_user) this.logout()
    return _user;
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('token_expiration');
    const now = new Date().getTime();

    return !expiration || now >= +expiration;
  }

  login(body: Login): Promise<any> {
    return new Promise((r, e) => {
      const ct = this.getCToken();
      const ep = (ct) ? "/login/"+ct.cross_token.token : "/login";
      console.log(ct, ep);
      const URL = getURL(this.serv, this.ss + ep);
      this.http.post(URL, body).pipe().subscribe({
        next: (res: any) => {
          this.refreshNewToken(res.kcToken);
          this.store.setJson("_profil", res.profil);
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }

  autoLogin(kc: any, profil: any){
    this.refreshNewToken(kc);
    this.store.setJson("_profil", profil);
  }

  setCToken(ctoken: any, kCToken: any) {
    return new Promise((r, e) => {
      const URL = getURL(this.serv,"cross-token/setCT");
      this.http.post(URL, { ctoken, kCToken }).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }



  refreshNewToken(data: any) {
    const expirationDate = new Date().getTime() + data.expires_in * 1000;
    localStorage.setItem('token_expiration', expirationDate.toString());
    this.store.set("_token", data.access_token);
    this.store.set("_refresh_token", data.refresh_token);
    this.store.set("_session_state", data.session_state);
    this.isLog = true;
  }

  register(body: UserReg): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/register");
      this.http.post(URL, body).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }

  logout(): Promise<any> {
    const tk = this.store.get("_refresh_token");
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/logout/" + tk);

      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          this.forceLogout();
          this.isLog = true;
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }
  forceLogout() {
    this.store.remove("_token");
    this.store.remove("_refresh_token");
    this.store.remove("_session_state",);
    this.store.remove("_profil");
    this.store.remove("token_expiration");
  }

  refreshToken() {
    const tk = this.store.get("_refresh_token");
    const URL = getURL(this.serv, this.ss + "/refreshtoken/" + tk);
    return this.http.get(URL);
  }

  getRefreshToken() {
    return new Promise((r, e) => {
     this.refreshToken().pipe().subscribe({
        next: (res: any) => {
          console.log(res);
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }

  getCT(token: any) {
    return new Promise((r, e) => {
      const URL = getURL(this.serv,"cross-token/getCT/" + token);
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          console.log(res);
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }

  saveCToken (token: any){
    this.store.setJson("_token_cross",token);
  }

  getCToken (){
    return this.store.getJson("_token_cross");
  }

  delCToken (){
    return this.store.remove("_token_cross");
  }

  getAvatar(id: number){
    return getURL("users","auth/avatar/"+id);
  }
  getButton(event: any) {
    if(event) {
     const  button = event.target as HTMLButtonElement;
      button.disabled = true;
      return button;
    }
    return false;
  }
  resetPass(email: string, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      const URL = getURL("users","auth/resetPassword");
      this.http.post(URL, { email }).pipe().subscribe({
        next: (res: any) => {
          if(button) button.disabled = false;
          r(res);
        },
        error: (error) => {
          if(button) button.disabled = false;
          e(error);
        }
      });
    });
  }

  resetNowPass(data: any, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      const URL = getURL("users","auth/resetNowPassword");
      this.http.post(URL, { data }).pipe().subscribe({
        next: (res: any) => {
          if(button) button.disabled = false;
          r(res);
        },
        error: (error) => {
          if(button) button.disabled = false;
          e(error);
        }
      });
    });
  }
}
