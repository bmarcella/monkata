import { getURL, gWURL } from "./environments/environment.prod";
import { httpGet, httpGetX, Services } from "./Http";

const services  = {
  
    getEnts : () => {
           const URL = getURL(Services.MEMPLOI, "cv/entreprises" );
            return  httpGetX(URL); 
    },
     getApps: () => {
         const URL = gWURL("applications");
         return  httpGetX(URL); 
     },
    
}


export  const  EntService = services; 