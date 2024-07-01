/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  setJson(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  getJson(key: string) {
    const json = localStorage.getItem(key);
    return JSON.parse(json + "");
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  constructor() { }


}
