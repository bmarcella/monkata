import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_model/User';
import { Users } from '../tools/models/Users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 // USER FOR PLEDIKA
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

    // USER FOR QNOTE
  private currentUserSubjectX: BehaviorSubject<Users>;
  public currentUserX: Observable<any>;

  constructor(private http: HttpClient) {
    // GET USER PLEDIKA
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    // GET USER QNOTE
    this.currentUserSubjectX = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUserX'))
    );
    this.currentUserX = this.currentUserSubjectX.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  public get currentUserValueX(): any {
    return this.currentUserSubjectX.value;
  }

  logoutX() {
    localStorage.removeItem('currentUserX');
    this.currentUserSubjectX.next(undefined);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

   setUserData(data) {
     localStorage.setItem('currentUser', JSON.stringify(data));
     this.currentUserSubject.next(data);
   }
   setUserDataX(data) {
     localStorage.setItem('currentUserX', JSON.stringify(data));
     this.currentUserSubjectX.next(data);
   }


}
