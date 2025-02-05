/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const Crud = {
  init :  <T> (DB: any, ENT: new (...args: any[]) => any) => {
     const repo = DB.getRepository(ENT);
     return new ORM<T>(repo);
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
export default Crud;
