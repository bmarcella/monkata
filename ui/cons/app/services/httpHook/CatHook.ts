
import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import { CatService } from "~/services/Categorie";


export const useGetAllCatForJob =  (_i: []) => {
  const [data , setData] = useState(_i);
  useEffect(() => {
    const data = CatService.getAllForJob();
    const fetchData = async () => {
    data.http.then(async (res: any) => {
           setData(res.data); 
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
  return [ data ];
};
