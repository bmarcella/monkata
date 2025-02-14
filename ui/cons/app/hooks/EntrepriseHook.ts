
import { CanceledError } from "axios";
import { useState, useEffect } from "react";

import { EntService } from "~/services/Entreprise";

export const useAppForAuth =  (data: []) => {
    const [apps, setApps] = useState(data);
    useEffect(() => {
      const data = EntService.getApps();
      const fetchData = async () => {
              data.http.then(async (res: any) => {
                      const r = res.data;
                      const ents: any = [];
                      const categories: any = [];
                               let i = 0;
                               Object.entries(r).forEach(([key, value]) => {
                                 if ((value as any ).show){
                                  const v:any = value ;
                                   categories.push({
                                       id: '1',
                                       name: v.name,
                                       description: v.description || "",
                                       icon: v.img || "",
                                       value: v.name,
                                       label: v.name
                                     },
                                   );
                                 }
                               });
             setApps(categories); 
         }).catch((e: any) => {
              if (e instanceof CanceledError && e.name === "CanceledError") {
                return;
              } 
              console.log("Request was canceled:", e);
         });
        } 
        fetchData();
        return () => { data.ctrl.abort() };
    }, []);
  
    return { apps, setApps };
  };

export const useEntForAuth =  (data: []) => {
  const [ents, setEnts] = useState(data);
  
  useEffect(() => {
    const data = EntService.getEnts();
    const fetchData = async () => {
            data.http.then(async (res: any) => {
                    const r = res.data;
                    const ents: any = [];
                    if (r.length!=0) {
                     await   Object.entries(r).forEach(([key, value]) => {
                             const v = value as any;
                             ents.push({
                                id: v.id,
                                name: v.name,
                                description: v.description || "",
                                logo: "",
                                value: v.id,
                                label: v.name
                              });
                      });
                    }
           setEnts(ents); 
       }).catch((e: any) => {
        if (e instanceof CanceledError && e.name === "CanceledError") {
          return;
        } 
        console.log("Request was canceled:", e);
   });;
    } 

      fetchData();
      return () => { data.ctrl.abort() };
  }, []);

  return { ents, setEnts };
};