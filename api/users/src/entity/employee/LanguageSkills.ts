import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_Cv } from "./User_Cv";

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


@Entity()
export class LanguageSkills {
  @PrimaryGeneratedColumn()
  id? : number;
  

  @Column({
    type: "enum",
    enum: Language,
    default: Language.Francais,
    nullable: true 
  })
  name? : Language;

  @Column({
    type: "enum",
    enum: Proficiency,
    default: Proficiency.Professionnelle,
    nullable: true 
  })
  proficiency? : Proficiency;


 @ManyToOne(() => User_Cv, userCv => userCv.worksExp)
 userCv?: User_Cv;


}



