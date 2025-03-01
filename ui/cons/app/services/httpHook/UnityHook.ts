import { useGetHttp } from '~/services/httpHook/HttpHook';

import { useState, useEffect } from "react";
import { UnityService } from "~/services/Unity";
import { Log } from "~/utils/auth";

export const useGetPostes =  (init: []) => {
  const [postes , setPoste] = useState(init);

  useGetHttp(UnityService.allPoste, async (res: any) => {
      const obj = res.data;
      Log(obj);
      setPoste(obj); 
  });


  return [ postes ];
};
