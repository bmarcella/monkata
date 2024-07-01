
export enum Type_etudes {
  universitaire = 'universitaire',
  professionels = 'professionels',
  etudes_classiques = "etudes classiques"
}
export class Etudes {
  id? : number;
  domaine?: string;
  degree?: string;
  institution?: string;
  description?: string;
  date_debut!: string;
  date_fin!: string;
  type_etudes?: Type_etudes;
  country? : string;
  city?: string;
}



