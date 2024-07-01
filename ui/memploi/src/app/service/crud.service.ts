/* eslint-disable @typescript-eslint/ban-types */
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import {
  getRURL,
  getURL,
} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private recaptchaV3Service: ReCaptchaV3Service) {

  }

  refresh() {
    const RURL = getURL("memploi", "cv/refresh");
    return this.get(RURL);
  }

  login() {
    this.get(getURL("users", "cross-token/addCT/memploi")).then((r) => {
      const URL = getRURL(r.cross_token, r.monkata_auth);
      window.location.href = URL;
    }).catch((e) => console.log(e));
  }

  loginWithReturn(path: any, event?: any) {
    const button = this.getButton(event);
    this.post(getURL("users", "cross-token/addCT/memploi"), { path }).then((r) => {
      if (button) button.disabled = false;
      const URL = getRURL(r.cross_token, r.monkata_auth);
      window.location.href = URL;
    }).catch((e) => {
      console.log(e);
      if (button) button.disabled = false;
    });
  }


  post(URL: string, data: any, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      console.log(URL);
      this.http.post(URL, data).pipe().subscribe({
        next: (res: any) => {
          if (button) button.disabled = false;
          r(res);
        },
        error: (error: any) => {
          if (button) button.disabled = false;
          e(error);
        }
      });
    });
  }

  postRC(URL: string, data: any, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
        data.tokenRC = token;
        this.http.post(URL, data).pipe().subscribe({
          next: (res: any) => {
            if (button) button.disabled = false;
            r(res);
          },
          error: (error: any) => {
            if (button) button.disabled = false;
            e(error);
          }
        });

      },
        (error: string) => {
          if (button) button.disabled = false;
          e(error);
        });
    });
  }


  getButton(event: any) {
    if (event) {
      const button = event.target as HTMLButtonElement;
      button.disabled = true;
      return button;
    }
    return false;
  }

  get(URL: string, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      this.http.get(URL).pipe().subscribe({
        next: (res: any) => {
          if (button) button.disabled = false;
          r(res);
        },
        error: (error: any) => {
          if (button) button.disabled = false;
          console.log(error);
          e(error);
        }
      });
    });
  }

  delete(URL: string, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      this.http.delete(URL).pipe().subscribe({
        next: (res: any) => {
          if (button) button.disabled = false;
          r(res);
        },
        error: (error: any) => {
          if (button) button.disabled = false;
          e(error);
        }
      });
    });
  }
  put(URL: string, data: any, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      console.log(URL);
      this.http.put(URL, data).pipe().subscribe({
        next: (res: any) => {
          if (button) button.disabled = false;
          r(res);
        },
        error: (error: any) => {
          if (button) button.disabled = false;
          e(error);
        }
      });
    });
  }

  patch(URL: string, data: any, event?: any): Promise<any> {
    const button = this.getButton(event);
    return new Promise((r, e) => {
      console.log(URL);
      this.http.post(URL, data).pipe().subscribe({
        next: (res: any) => {
          if (button) button.disabled = false;
          r(res);
        },
        error: (error: any) => {
          if (button) button.disabled = false;
          e(error);
        }
      });
    });
  }

  upload(url: string, data: any, event?: any): Observable<HttpEvent<{}>> {
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data",
    });
    const req = new HttpRequest("POST", url, data, {
      reportProgress: true,
      responseType: 'json'
    });
    req.clone({ headers });
    return this.http.request(req);
  }



}
