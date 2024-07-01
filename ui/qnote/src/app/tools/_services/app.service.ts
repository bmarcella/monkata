import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {

 constructor(private http: HttpClient) {

  }

  getData(url) {
     return this.http.get<any>(url).pipe(
      map((rep) => {
        return rep;
      })
      );
  }
  private handleError(error: any) {
  let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  return Observable.throw(error);
  }

  setData(url, data) {
    return this.http.post<any>(url, data);
  }

}
