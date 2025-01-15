import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  addMal(data) {
    return this.http.post<any>(`${environment.apiUrl}maladies`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }

  addParent(data) {
    return this.http.post<any>(`${environment.apiUrl}parents`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }

  editMal(data,id) {
    return this.http.patch<any>(`${environment.apiUrl}maladies/${id}`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }

  editParent(data,id) {
    return this.http.patch<any>(`${environment.apiUrl}parents/${id}`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }
  addStudent(data) {
    return this.http.post<any>(`${environment.apiUrl}admission`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }
  // add prof
  addProf(data) {
    return this.http.post<any>(`${environment.apiUrl}addProf`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }

  addPersonnel(data) {
    return this.http.post<any>(`${environment.apiUrl}addPersonnel`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }
 addNParent(data) {
    return this.http.post<any>(`${environment.apiUrl}addNParent`, data).pipe(
      map(rep => {
        return rep;
      })
    );
  }
  // get student by id
  getAll(url) {
    return this.http.get<any>(url).pipe(
      map(rep => {
        return rep;
      })
    );
  }

  // get student by id
  getUserById(id) {
    return this.http.get<any>(`${environment.apiUrl}getUserById/` + id).pipe(
      map(rep => {
        return rep;
      })
    );
  }

  // get student by id
  getUserByCode(code) {
    return this.http
      .get<any>(`${environment.apiUrl}getUserByCode/` + code)
      .pipe(
        map(rep => {
          return rep;
        })
      );
  }

  // pay student by id
  payByUserId(code) {
    return this.http
      .get<any>(`${environment.apiUrl}payByUserById/` + code)
      .pipe(
        map(rep => {
          return rep;
        })
      );
  }
}
