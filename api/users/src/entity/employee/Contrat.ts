import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";

export enum TYPE_CONTRAT {
    CDI ,
    CDD ,
    Stage ,
    Freelance,
  }
  export enum STATUS_CONTRAT {
    active ,
    expired ,
    terminated ,
  }
  

@Entity()
export class Contrat   extends BaseEntity  {

@PrimaryGeneratedColumn()
id? : number;

id_employee?: number;
 
@Column({ nullable : false })
id_template_contrat?: number;

@Column({ nullable : false })
date_debut?: Date;

@Column({ nullable : true })
date_fin?: Date;

@Column({ nullable : false })
id_poste?: number;


@Column({
    type: "enum",
    enum: TYPE_CONTRAT,
    default: TYPE_CONTRAT.CDD,
    nullable: true
  })
contract_type?: TYPE_CONTRAT;

@Column({
    type: "enum",
    enum: STATUS_CONTRAT,
    default: STATUS_CONTRAT.active,
    nullable: true
  })
status_contract?: STATUS_CONTRAT;

@Column({ nullable : false })
active?: boolean;

}



