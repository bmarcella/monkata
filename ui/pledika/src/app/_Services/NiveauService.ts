import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './Authentification.service';
@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  // private headers = new Headers({
  // 'Content-Type': 'application/json',
  // 'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
  // });
  // const headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
  // });
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }
  getNiv() {
    return this.http
      .get<any>(`${environment.apiUrl}niveaus`)
      .pipe(map(rep => {
        return rep;
      }));
  }
}
