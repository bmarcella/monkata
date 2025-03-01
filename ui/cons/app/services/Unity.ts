
import { getURL } from "./environments/environment.prod";
import { httpGetX, httpPostX, Services } from "./Http";

const services  = {
  
    all : () => {
       const URL = getURL(Services.USERS, "unity/all" );
      return  httpGetX(URL); 
    },

    add : <T>(payload: T) => {
        const URL = getURL(Services.USERS, "unity/add" );
        return  httpPostX<T>(URL, payload); 
   },

   allPoste : () => {
    const URL = getURL(Services.USERS, "unity/allPostes" );
    return  httpGetX(URL); 
  },
    
}


export  const  UnityService = services; 