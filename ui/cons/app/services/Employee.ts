import { getURL } from "./environments/environment.prod";
import {  httpPostX, Services } from "./Http";

const services  = {
  
    add : <T>(payload: T) => {
        const URL = getURL(Services.USERS, "unity/add" );
        return  httpPostX<T>(URL, payload); 
   },
    
}


export  const  EmpService = services; 