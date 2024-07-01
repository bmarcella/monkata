import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Horaire_de_travail } from "./Jobs";
import { User_Cv } from "./User_Cv";
import { BaseEntity } from "./BaseEntity";

export enum Type_contrat {
  Permanent = "Permanent"
}

@Entity()
export class Works_exp  extends BaseEntity  {

@PrimaryGeneratedColumn()
id? : number;
  
@Column({
    type: "enum",
    enum: Horaire_de_travail,
    default: Horaire_de_travail.temps_plein,
})
horaire_de_travail?: Horaire_de_travail;


@Column({ nullable : true })
etablissement?: string;


@Column({ nullable : true })
poste?: string;


@Column({ nullable : true })
description?: string;



@Column({ type: 'date', nullable : true  })
date_debut!: string;


@Column({ type: 'date', nullable : true  })
date_fin!: string;

@Column({
  type: "enum",
  enum: Type_contrat,
  default: Type_contrat.Permanent,
})
type_contrat?: Type_contrat;

@Column({  nullable: true })
country?: string;

@Column({  nullable: true })
city?: string;

@ManyToOne(() => User_Cv, userCv => userCv.worksExp)
userCv?: User_Cv;

}



