/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from "express";
import { Not } from "typeorm";
import { DGetAll, DGetOne, DGetTree, DSaveTree } from "../../../../../common/mvc/CrudService";
import { Unity, UnityType } from "../../entity/unity/Unity";
const services = {
 
allNested : async (req: Request, res: Response) => {
    const data  = await DGetTree<Unity>(req.DB, Unity);
    res.send(data);
},
allPoste: async (req: Request, res: Response) => {
  const app = req.payloadEnt.obj;
  const data  = await DGetAll<Unity>(req.DB, Unity, {
    select: {
        id: true,
        id_entApp: true,
        name: true,
        type_unity: true,
        icon: true,
        description: true
    },
    where : {
      id_entApp: app.id,
      type_unity : UnityType.poste
    }
}
);
  res.send(data);
},
allUnityWithoutParent: async (req: Request, res: Response) => {
  const data  = await DGetAll<Unity>(req.DB, Unity, {
    select: {
        id: true,
        id_entApp: true,
        name: true,
        type_unity: true,
        icon: true,
        description: true
    },
    where : {
      // id_entApp: app.id,
      type_unity : Not(UnityType.poste)
    }
}
);
  res.send(data);
},
all: async (req: Request, res: Response) => {
  const app = req.payloadEnt.obj;  
  const data  = await DGetAll<Unity>(req.DB, Unity, {
    select: {
        id: true,
        id_entApp: true,
        name: true,
        type_unity: true,
        icon: true,
        description: true
    },
    where : {
      id_entApp: app.id,
      type_unity : Not(UnityType.poste)
    }
}
);
  res.send(data);
},
add : async (req: Request, res: Response) => {
  const app = req.payloadEnt.obj;
  const obj = new Unity();
  obj.name = req.body.name;
  obj.icon = req.body.icon;
  obj.description = req.body.description;
  obj.type_unity = req.body.type_unity;
  obj.id_entApp = app.id;
  if(req.body.parent && req.body.parent!=""){
    const c = await  DGetOne<Unity>(req.DB, Unity, {
      where: {
        id: req.body.parent
      }
    });
    if (c) {
     obj.parent = c; 
    }
  }
  const nObj = await DSaveTree<Unity>(req.DB, Unity, obj);
  res.send(nObj);
},

   
};
export default services;
