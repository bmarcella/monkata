import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) {
  }

  // add student
  addStudent(data) {
    return this.http
      .post<any>(`${environment.apiUrl}userEntities`, data)
      .pipe(map(rep => {
        return rep;
      }));
  }

  addPersonnel(data) {
    return this.http
      .post<any>(`${environment.apiUrl}addPersonnel`, data)
      .pipe(map(rep => {
        return rep;
      }));
  }
}
