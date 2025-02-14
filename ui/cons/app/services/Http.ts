
import { Log } from '~/utils/auth';
import axios from './api-client';
import { getURL } from './environments/environment.prod';
import { RHManaMenu } from '~/components/shared/menu';

export  enum  Services{
  USERS = 'users',
  MEMPLOI =   'memploi',
}

const get  =  <T> (endpoint: string, button?: any) => {
  
  return new  Promise ((resolve, reject)=> {
  const controller = new AbortController();
     return  axios.get<T>(endpoint, {
          signal: controller.signal, 
        })
        .then(json => {
            if (button) button.disabled = false;
            resolve({ data: json.data, controller} )
        })
        .catch(error => {
            if (button) button.disabled = false;
            reject(error);
        });
    });
}
const getAbort =  <T> (endpoint: string, signal: any, button?: any, ) => {
  
  return new  Promise ((resolve, reject)=> {
     return  axios.get<T>(endpoint, {
          signal, 
        })
        .then(json => {
            if (button) button.disabled = false;
            resolve({ data: json.data } )
        })
        .catch(error => {
            if (button) button.disabled = false;
            reject(error);
        });
    });
}

const httpGet = (endpoint: string, event?: any ) => {
   const button =  getButton(event);
   return get(endpoint, button)
}

const httpGetX = (endpoint: string, event?: any ) => {
  const button =  getButton(event);
  const controller = new AbortController(); // Create AbortController
  const signal = controller.signal;
  return  { http: getAbort(endpoint, signal, button), ctrl: controller };
}

const Launch = (data: { ent: string, app: string }) => {
  return new  Promise<any>((resolve, reject)=>{
    const URL = getURL("users","entreprise/loginEnt/"+data.ent+"/"+data.app);
    httpGet(URL).then((res: any) => {
      resolve(res.data);
    }).catch((e: any) => {reject(e);})
  })
}

export const httpGetCrossToken = (token: string) => {
  return new  Promise<any>((resolve, reject)=>{
    const URL = getURL(Services.USERS, "auth/getCrossFreeToken/" + token);
    httpGet(URL).then((res: any) => {
      resolve(res.data);
    }).catch((e: any) => {reject(e);})
  })
}

const getButton = (event: any) => {
  if (event) {
    const button = event.target as HTMLButtonElement;
    button.disabled = true;
    return button;
  }
  return false;
}

const getMenu = (name:string) => {
  switch(name){
    case "memploi" :
    return  RHManaMenu;
    default:
    return {};
  }
}

export { httpGet, httpGetX, getMenu, Launch};
