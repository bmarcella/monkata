import { environment } from "src/environments/environment.prod";

export const Log =  (text: string ) => {
  if (environment.production){
      console.log(text);
  }
}