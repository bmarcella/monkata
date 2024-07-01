export interface Val {
  name : string,
  length?: number| boolean ;
  mlength?: number| boolean ;
  message?: string | undefined;
  lmessage?: string | undefined;
  mlmessage?: string | undefined;
  date_greater?: Date | undefined;
  dg_message?: string | undefined;
}

export interface ReqVal {
  error: boolean,
  data: string [] ;
}


export const Validator = async (obj : any , val: Val[]) : Promise<ReqVal> => {

  return new Promise<ReqVal>( (r: any , e: any) => {
    const  error: any =  [];

        for(let i=0; i<val.length; i++) {
             const element = val[i];
              if (obj[element.name] == undefined || obj[element.name] == "") {
                  error.push(element.message);
                  continue;
              }

              if (element.length) {
                if (obj[element.name].length < element.length) {
                  error.push(element.lmessage);
                }
              }

             if (element.mlength) {
              if (obj[element.name].length > element.mlength) {
                error.push(element.mlmessage);
              }
             }

             if (element.date_greater){
              console.log(obj[element.name]," <- : -> ", element.date_greater);
              if (obj[element.name] < element.date_greater) {
                error.push(element.dg_message);
              }
             }

        }

    if (error.length==0){
       r({ error: false, data: [] });
     } else {
      r({ error: true , data: error });
    }

  });
}

export const checkValidator = async (entreprise: any, val: Val[], e?: any )  => {
  toggleButton(e, true);
  const rep: ReqVal = await Validator(entreprise, val);
      console.log(rep);
      let message = ""
      if(rep.error) {
         message = "<h6> Vous devez corriger ces erreurs avant de continuer:</h6>";
         message = message + "<ol >";
        for (let i=0; i< rep.data.length; i++){
           const element = rep.data[i];
           message = message + "<li>"+element+"</li>";
        }
       message += "</ol>";
    }
    return  {error : rep.error,  message};
}


export const toggleButton = (event: any, a: boolean) => {
  if(event) {
   const  button = event.target as HTMLButtonElement;
    button.disabled = a;
  }
}
