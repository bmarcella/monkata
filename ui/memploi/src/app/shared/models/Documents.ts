

export enum Type_Doc {
    cv = "Cv",
    diplome = "Diplome",
    certificat = "Certificat",
    lettre_motivation = "Lettre motivation",
    Carte_identite = " Carte d'identité",
    passport = "Passeport",
    permis_de_conduire = "Permis de conduire",
    Certificat_de_police = "Certificat de police",
    Certificat_de_travail = "Certificat de Travail",
    autres = "Autres",
  }

export class Documents  {


    id?: number;
    type_doc?: string;

    mime?: string;

    keycloakId?: string;

    size?: number;
    name?: string;

}

