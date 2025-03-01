
import { CanceledError } from "axios";
import { useState, useEffect } from "react";


export const useGetHttp =  <T> (services: any, _callback: any ) => {
    useEffect(() => {
      const service = services();
      const fetchData = async () => {
        service.http.then(_callback).catch((e: any) => {
              if (e instanceof CanceledError && e.name === "CanceledError") {
                return;
              } 
         });
        } 
        fetchData();
        return () => { service.ctrl.abort() };
    }, []);

  };


  export const usePostHttp = <T> (services: any ) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [alert, setAlert] = useState<any>(null);
    const run = async ( payload: T, _callback: any, ) => {
      const service = services(payload);
        service.http.then(_callback).catch((e: any) => {
              setError(e);
              if (e instanceof CanceledError && e.name === "CanceledError") {
                return;
              } 
         });
     } 
     return {  run, loading, error, response, setResponse, alert, setAlert };
  };



