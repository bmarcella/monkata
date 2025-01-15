import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getURL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  ss = "categories";
  serv = "users"
  constructor(private http: HttpClient) {
  }

  add(data: any): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/add");
      this.http.post(URL, data).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error) => {
          e(e);
        }
      });
    });
  }

  show(): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/show");
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error) => {
          e(e);
        }
      });
    });
  }

  getCatforEnt(name : string): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/listByTypeCat/"+name);
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error) => {
          e(e);
        }
      });
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((r, e) => {
      const URL = getURL(this.serv, this.ss + "/delete/" + id);
      console.log(URL);
      this.http.delete(URL).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error) => {
          e(e);
        }
      });
    });
  }
}
