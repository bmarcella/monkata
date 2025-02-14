

export class StorageService {

  static set(key: string, value: string) {
     localStorage.setItem(key, value);
  }
  static setJson(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string) {
    return localStorage.getItem(key);
  }

  static getJson(key: string) {
    const json = localStorage.getItem(key);
    return JSON.parse(json + "");
  }
  static remove(key: string) {
    localStorage.removeItem(key);
  }
  constructor() { }
}

export const defaultLang = ()=>{
      return localStorage.get("i18nextLng");
}

