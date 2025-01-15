import { environment } from './../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_model/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 // USER FOR PLEDIKA
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

  public currentUserX: Observable<any>;

  constructor(private http: HttpClient) {
    // GET USER PLEDIKA
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

   setUserData(data) {
     localStorage.setItem('currentUser', JSON.stringify(data));
     this.currentUserSubject.next(data);
  }



  register(creds) {
    return this.http
      .post<any>(`${environment.apiUrl}register`, creds)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}login`, {
        username,
        password
      })
      .pipe(
        map(rep => {
          if (!rep.crash) {
              localStorage.setItem('currentUser', JSON.stringify(rep.data));
              this.currentUserSubject.next(rep.data);
              this.setUserData(rep.data);
          }
          return rep;
        })
      );
  }


}
