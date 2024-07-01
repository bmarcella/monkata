
import { Horaire_de_travail, Type_contrat } from "./Jobs";
export class Works_exp {
  id? : number;
  horaire_de_travail?: Horaire_de_travail;
  etablissement?: string;
  poste?: string;
  description?: string;
  date_debut?: string;
  date_fin?: string;
  type_contrat?: Type_contrat;
  country? : string;
  city?: string;
}



