/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from "express";
import { PermissionData, PermissionService } from "../../../../common/index/PermissionValue";
import Crud from "../../../../common/mvc/CrudService";
import { EntApp } from "../entity/EntApp";
import { EntAppToken } from "../entity/EntAppToken";
import { Permission, Userroleapp } from "../entity/Urole";
import { User } from "../entity/User";
const NPage = 10
const services = {
 
  initPermissions : async (req: Request, res: Response) => {
     
    const ormPerm = Crud.init<Permission>(req.DB, Permission);

    const getPrep = (app: string, name: string) : [ any , Permission]  => {
      const d = new Permission();
      d.name = name;
      d.appName = app;
      const p: any =  {
        where: {
          appName : app,
          name : name
       }
     };
     return  [ p , d ];
    };

    PermissionData.forEach( async (item : PermissionService) => {

      const data: any [] =  Object.values(item.enum);

      for(let i = 0 ; i < data.length; i++ ) {
           const pred = getPrep(item.name, data[i]) ;

           const perm = await ormPerm.get(false, pred[0]) as Permission ;
           if(!perm && typeof data[i] == "string" ) {
             const d : Permission = pred[1];
             ormPerm.save(d);
           }
      }
    });
    res.send({ message : "Permission created"});
  },
  
  all : async (req: Request, res: Response) => {
    const ormPerm = Crud.init<Permission>(req.DB, Permission);
    const perm = await ormPerm.get(true) as Permission [] ;
    res.send(perm);
  },
  getRole : async (req: Request, res: Response) => {
    const ent = req.payloadEnt.obj;
    const ormPerm = Crud.init<Userroleapp>(req.DB, Userroleapp);
    const perm = await ormPerm.get(true, {
      where : {
        idAppEnt: ent.id
      }
    }) as Userroleapp [] ;
    res.send(perm);
  },
  getUserRole : async (req: Request, res: Response) => {
    const ent = req.payloadEnt.obj;
    console.log(ent);
    const page = Number(req.params.page);
    const skip = (page - 1) * NPage;
    const wh = "t1.id_user = t4.keycloakId AND t3.id = t1.EntAppId "; 
    const objs = await req.DB.getRepository(EntAppToken)
        .createQueryBuilder("t1")
        .from(User, "t4") // Jointure cartésienne
        .from(EntApp, "t3") // Jointure cartésienne
            .select([
              "t4.id as id",
              "t4.firstName as firstName",
              "t4.lastName as lastName",
              "t4.email as email",
          ])
        .where(wh) // Clause WHERE basée sur une colonne commune
        .skip(skip)
        .take(NPage)
        .getRawMany();
    res.send(objs);
  }
};
export default services;
