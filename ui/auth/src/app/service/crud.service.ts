import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getURL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  post(URL: string, data: any): Promise<any> {
    return new Promise((r, e) => {
      console.log(URL);
      this.http.post(URL, data).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error: any) => {
          e(e);
        }
      });
    });
  }

  get(URL: string): Promise<any> {
    return new Promise((r, e) => {
      console.log(URL);
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error: any) => {
          e(e);
        }
      });
    });
  }

  delete(URL: string): Promise<any> {
    return new Promise((r, e) => {
      this.http.delete(URL).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error: any) => {
          e(e);
        }
      });
    });
  }
  put(URL: string, data: any): Promise<any> {
    return new Promise((r, e) => {
      console.log(URL);
      this.http.put(URL, data).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error: any) => {
          e(e);
        }
      });
    });
  }

  patch(URL: string, data: any): Promise<any> {
    return new Promise((r, e) => {
      console.log(URL);
      this.http.post(URL, data).pipe().subscribe({
        next: (res: any) => {
          r(res);
        },
        error: (error: any) => {
          e(e);
        }
      });
    });
  }

}
