import { StorageService as store } from '../services/storage';
export const isUserAuth = ()=> {
    return new Promise((resolve)=>{
         const _token = store.get("_token");  
             const _profil = store.getJson("_profil");
        if(_token && _profil) { 
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

export const isEntAuth = ()=> {
    return new Promise((resolve)=>{
        const _token =  store.getJson("entToken") as any ;  
        if(_token) { 
            resolve(true);
        } else {
            resolve(false);
        }
    });
}