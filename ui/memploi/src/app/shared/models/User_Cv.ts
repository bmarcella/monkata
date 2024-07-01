
import { Works_exp } from "./Works_exp";
import { Etudes } from "./Etudes";
import { Skills } from "./Skills";
import { References } from "./References";
import { LanguageSkills } from "./LanguageSkills";

export enum Dispo {
  Consultant ,
  Temps_partiel,
  Temps_plein,
  Non_disponible,
  Tout
}

export interface User_Cv {

  id? : number;
  title_prof?: string;

  firstName?: string;
  lastName?: string;

  sexe?: string;

  id_user?: number;
  keycloakId?: string;


  profile?: string;
  annee_debut?: number;

  telephone_a?: string;

  telephone_b?: string;
  email_contact?: string;
  country?: string;


  city?: string;


  linkedin?: string;


  nin?: string;

  nif?: string;

  passport?: string;

  street? : string;

  worksExp?: Works_exp[];

  etudes?: Etudes[];
  skills?: Skills[];
  languageSkills?: LanguageSkills[];
  references?: References[];

  disponibilte? : Dispo;
  relocate ?: boolean;

}


