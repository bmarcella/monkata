/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const Crud = {
  init :  <T> (DB: any, ENT: new (...args: any[]) => any) => {
     const repo = DB.getRepository(ENT);
     return new ORM<T>(repo);
  },

  initTree :  <T> (DB: any, ENT: new (...args: any[]) => any) => {
    const repo = DB.getTreeRepository(ENT);
    return new ORMTREE<T>(repo);
 },
};

class ORM <T> {
  constructor(private repository: any) {}

  async save (data: T)  : Promise<Awaited<T>>  {
    return await this.repository.save(data);
  }

  update ( data: T, where: any)  {
    
  }

  async get ( all: boolean = false, pred?: any) : Promise< T[] | Awaited<T>>  {
    return await (all) ? this.repository.find(pred) : this.repository.findOne(pred) ;
  }

  async del  (pred?: any)  {
    return await  this.repository.delete(pred) ;
  }

  async count  ( pred?: any) : Promise<Awaited<any>>   {
    const total = await (pred) ? this.repository.count(pred) : this.repository.count() ;
    return total;
  }

}

class ORMTREE <T> {
  constructor(private repository: any) {}


  async get ( pred?: any) : Promise< T[] | Awaited<T>>  {
    return await  this.repository.findTrees(pred) ;
  }

  async save (data: T)  : Promise<Awaited<T>>  {
    return await this.repository.save(data);
  }


}
export default Crud;

export  const  DSave = <T> (DB: any,ENT: new (...args: any[]) => any, data: T ) : T => {
   const crud = Crud.init(DB, ENT);
    return  crud.save(data) as T;
};

export  const  DSaveTree = <T> (DB: any,ENT: new (...args: any[]) => any, data: T ) : T => {
  const crud = Crud.initTree(DB, ENT);
    return  crud.save(data) as T;
};

export  const  DGetTree = <T> (DB: any,ENT: new (...args: any[]) => any, preds?: any ) : T => {
    const crud = Crud.initTree(DB, ENT);
    return  crud.get(preds) as T;
};

export  const  DGetOne = <T> (DB: any,ENT: new (...args: any[]) => any, preds?: any ) : T => {
  const crud = Crud.init(DB, ENT);
  return  (preds) ?  crud.get(false,preds) as T : crud.get(false) as T;
};

export  const  DGetAll = <T> (DB: any,ENT: new (...args: any[]) => any, preds?: any ) : T => {
  const crud = Crud.init(DB, ENT);
  return  (preds) ?  crud.get(true, preds) as T : crud.get(true) as T;
};