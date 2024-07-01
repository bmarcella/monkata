import { Currency } from './Currency';
export enum Horaire_de_travail {
  temps_plein = "Temps plein",
  temps_partiel = "Temps partiel",
}

export enum Periode_salaire {
  annuel = "Annuel",
  mensuel = "Mensuel",
  hebdomadaire = "hebdomadaire",
  bihebdomadaire = "bihebdomadaire",
  journalier = "journalier",
  heure = "heure"
}

export enum Env_Work {
  presentiel = "Presentiel",
  Teletravail = "Teletravail",
  hybride = "Hybride",
}

export enum Type_contrat {
  permanent = "Permanent",
  stage = "Stage",
  contrat = "Contrat",
  temporaire = "Temporaire",
}

export enum App_Reception {
  memploi = "Memploi.com",
  email = "Email",
  lien = "Lien",
  whatsapp = "Whatsapp",
}

export class Jobs  {

  id?: number
  titre_job?: string;

  categorie?: string;

  description?: string;

  exigences?: string;

  app_reception?: App_Reception;
  app_Reception?: App_Reception;

  type_contrat?: Type_contrat;
  env_de_travail?: Env_Work;

  horaire_de_travail?: Horaire_de_travail;

  lien_to_apply?: string;


 email_to_apply?: string;

 phone_to_apply?: string;

 benefits?: string;

 publish?: boolean;

 periode_salaire?: Periode_salaire;


 salaire?: number;

 currency?: Currency;

job_permanent?: boolean;



date_echeance?: Date;

adresse_job?: string;

entreprise_id?: number;

create_by?: number;

is_lm_require?: boolean;
is_cv_require?: boolean;
is_diplome_require?: boolean;
is_certificat_require?: boolean;

}
