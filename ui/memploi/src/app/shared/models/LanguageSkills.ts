

export enum Language {
  Creole_Haitien = "Créole Haitien",
  Francais = "Français",
  Anglais = "Anglais",
  Espagnol = "Espagnol",
  Allemand = "Allemand",
  Italien = "Italien",
  Portugais = "Portugais",
  Russe = "Russe",
  Chinois = "Chinois",
  Japonais = "Japonais",
  Arabe = "Arabe",
  Hindi = "Hindi",
  Bengali = "Bengali",
  Coreen = "Coréen",
  Turc = "Turc",
  Neerlandais = "Néerlandais",
}

export enum Proficiency {
  Professionnelle_limitee = "Professionnel limité",
  Professionnelle = "Professionnel",
  Professionnelle_complete ="Professionnel complèt",
  Natif_ou_bilingue ="Natif ou bilingue"
}


export class LanguageSkills {
  id? : number;
  name? : Language;
  proficiency? : Proficiency;
}



