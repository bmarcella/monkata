import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

 delSalle(code) {
    return this.http.delete<any>(`${environment.apiUrl}salles/${code}`)
      .pipe(
        map(rep => {
          return rep;
        })
      );
  }

  getSalle() {
    return this.http
      .get<any>(`${environment.apiUrl}salles?size=100`)
      .pipe(
        map(rep => {
          return rep;
        })
      );
  }
  addSalle(data) {
    return this.http
      .post<any>(`${environment.apiUrl}salles`,data)
      .pipe(
        map(rep => {
          return rep;
        })
      );
  }

  constructor(private http: HttpClient) {
  }
}
