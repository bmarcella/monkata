
import { Request, Response } from "express";
const services = {
 
  add : async (req: Request, res: Response) => {
     
  
     return  res.send({ message : "Permission created"});
}

   
};
export default services;
