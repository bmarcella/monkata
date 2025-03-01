
import { CanceledError } from "axios";
import { useState } from "react";
import { JobsService as Service } from "~/services/Jobs";

export const useGetAllJobs =  (_i: [] ) => {
  const [data , setData] = useState(_i);
  const fetchData = async (page, np=10) => {
  const req = Service.getAll(page, np);
  req.http.then(async (res: any) => {
           setData(res.data); 
       }).catch((e: any) => {
            if (e instanceof CanceledError && e.name === "CanceledError") {
              return;
            } 
            console.log("Request was canceled:", e);
       });
   } ;
   return [ data, fetchData ];
};
