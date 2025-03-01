import { Type_Categorie } from "~/routes/memploi/jobs/FormJob";
import { getURL } from "./environments/environment.prod";
import {  httpGetX, Services } from "./Http";

const services  = {
  
    getAllForJob : () => {
           const URL = getURL(Services.USERS, "categories/listByTypeCat/"+Type_Categorie[0]);
            return  httpGetX(URL); 
    },
    
}


export  const  CatService = services; 