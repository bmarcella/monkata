import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

 getVac() {
    return this.http
      .get<any>(`${environment.apiUrl}vacations`)
      .pipe(
        map(rep => {
          return rep;
        })
      );
  }

  constructor(private http: HttpClient) {
  }
}
