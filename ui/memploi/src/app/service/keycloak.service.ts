import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getURL } from 'src/environments/environment.prod';

import { Login } from '../../../../../common/dto/Login';
import { UserReg } from '../shared/models/UserReg';
import { StorageService } from './storage.service';

type LogMess= { login : boolean , caller : string };
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  isLog = false;
  ss = "auth";
  serv = "users";


  constructor(private http: HttpClient, private store: StorageService) {
    const _tk = this.store.get("_token");
    if (_tk)  this.isLog = true;
    // this.loginSubs.next({login: this.isLog , caller: "CONSTRUCTOR" } );
  }


  isLoggedIn() {
    const _tk = this.store.get("_token");
    if (_tk)  this.isLog = true;
    const r = (_tk && this.isLog) as boolean;
    return r;
  }


  isLoggedInGuard() {
    const _tk = this.store.get("_token");
    if (_tk)  this.isLog = true;
    return _tk && this.isLog;
  }

  profil() {
    const _user = this.store.getJson("_profil");
    if (!_user) this.logout()
    return _user;
  }

  cv() {
    const _user = this.store.getJson("_cv");
    return _user;
  }


  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('token_expiration');
    const now = new Date().getTime(); // Get current time in milliseconds
    if (expiration) {
      const isExpired = now >= parseInt(expiration, 10); // Parse string to integer and compare
      console.log('Token expired:', isExpired);
      return isExpired;
    }
    return true; // Assume expired if no expiration is set
  }

  isRefreshTokenExpired(): boolean {
    const expiration = localStorage.getItem('refresh_token_expiration');
    const now = new Date().getTime(); // Get current time in milliseconds
    if (expiration) {
      const isExpired = now >= parseInt(expiration, 10); // Parse string to integer and compare
      console.log('Refresh Token expired:', isExpired);
      return isExpired;
    }
    return true; // Assume expired if no expiration is set
  }

  refreshNewToken(data: any) {
    this.isLog = true;
    const now = new Date();
    const expirationDate = new Date(now.getTime() + (data.expires_in * 1000)); // Convert seconds to milliseconds
    const rexpirationDate = new Date(now.getTime() + (data.refresh_expires_in * 1000)); // Convert seconds to milliseconds
    localStorage.setItem('token_expiration', expirationDate.toString());
    localStorage.setItem('refresh_token_expiration', rexpirationDate.toString());
    this.store.set("_token", data.access_token);
    this.store.set("_refresh_token", data.refresh_token);
    this.store.set("_session_state", data.session_state);
  }

  login(body: Login): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/login");
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


  approveUser() {
    const _user = this.store.getJson("_profil");
    _user.approuved= true;
    this.store.setJson("_profil", _user);
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
      if (tk) {
        const URL = getURL(this.serv, this.ss + "/logout/" + tk);
        this.forceLogout();
        this.http.get(URL).pipe().subscribe({
          next: (res: any) => {
            this.forceLogout();
            this.isLog = false;
            r(res);
          },
          error: (error) => {
            this.isLog = false;
            this.forceLogout();
            e(error);
          }
        });
    }
    });
  }
  forceLogout() {
    this.store.remove("_token");
    this.store.remove("_refresh_token");
    this.store.remove("_session_state",);
    this.store.remove("_profil");
    this.store.remove("_cv");
  }
  refreshToken() {
    const tk = this.store.get("_refresh_token");
    const URL = getURL(this.serv, this.ss + "/refreshtoken/" + tk);
    return this.http.get(URL);
  }

  getCT(token: any) {
    return new Promise((r, e) => {
      const URL = getURL("memploi","cv/getCrossToken/"+ token);
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          console.log(res);
          this.store.setJson("_profil", res.profil);
          this.store.setJson("_cv", res.user);
          r(res);
        },
        error: (error) => {
          e(error);
        }
      });
    });
  }

 setLogin(){
    this.isLog = true;
 }

  getUserProfil(): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/userProfil");
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          this.store.setJson("_profil", res);
          r(res);
        },
        error: (error) => {
          console.log(error);
          e(error);
        }
      });
    });
  }

  getAvatar(id: number){
    return getURL("memploi","cv/avatar/"+id);
  }

  getDoc(id: number){
    return getURL("memploi","cv/getDocById/"+id);
  }

  getLogo(id: number){
    return  getURL("memploi","cv/logo/"+id);
  }

}
