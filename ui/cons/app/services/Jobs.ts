import { getURL } from "./environments/environment.prod";
import {  httpGetX, httpPostX, Services } from "./Http";

const services  = {
  
  add : <T>(payload: T) => {
        const URL = getURL(Services.MEMPLOI, "addFC" );
        return  httpPostX<T>(URL, payload); 
   },
   getAll : (page: number, np=10) => {
    const URL = getURL(Services.MEMPLOI, "getJobByIdEntFC/"+np+"/"+page );
     return  httpGetX(URL); 
   },
    
}


export  const  JobsService = services; 