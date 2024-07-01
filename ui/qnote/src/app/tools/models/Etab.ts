export class Etab {
  code: string;
  etab_name: string;
  moy_total: number;
  // tslint:disable-next-line:variable-name
  moy_pass: number;
  // tslint:disable-next-line:variable-name
  moy_rep: number;
  // tslint:disable-next-line:variable-name
  moy_exc: number;
  moy_exc_2: number;
  phone: string;
  adresse: string;
  email: string;
  height: number;
  width: number;
  domaine;
  date_debut: any;
  date_fin: any;

  public constructor(_code:any , _name:any, _moy_total:any, _moy_pass:any, _moy_rep:any,_moy_exc:any ) {
    this.code = _code;
    this.etab_name = _name;
    this.moy_total = _moy_total;
    this.moy_pass  = _moy_pass;
    this.moy_rep   = _moy_rep;
    this.moy_exc   = _moy_exc;
    this.phone = '(509)3138-1388';
    this.adresse   = '20, rue faustin 1er , Delmas 75';
    this.email     = 'pledikat@gmail.com';
    this.width     = 8.5;
    this.height    = 11;
    this.domaine = "";
  }

  public setMoyExc2(d:number) {
    this.moy_exc_2 = d;
  }

  setContrat(db: any, df:any) {
    this.date_debut = db;
    this.date_fin = df;
  }


}
