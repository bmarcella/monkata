import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  getDom() {
    return this.http
      .get<any>(`${environment.apiUrl}doms`)
      .pipe(
        map(rep => {
          return rep;
        })
      );

  }

  getOptionByDom(url) {
    return this.http
      .get<any>(url)
      .pipe(
        map(rep => {
          return rep;
        })
      );

  }

  constructor(private http: HttpClient) {
  }
}
