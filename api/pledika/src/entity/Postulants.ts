import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export enum Etat_demande {
  encours = 'encours',
  vue="Vue",
  consideration = 'Consideration',
  entrain_de_traité = 'Entrain de traité',
  interview_1  = 'Interview 1',
  interview_2  = 'Interview 2',
  interview_3  = 'Interview 3',
  evaluation_1  = 'Evaluation 1',
  evaluation_2  = 'Evaluation 2',
  rejetté ='Rejetté',
  obtenu = 'Obtenu',
  retire = 'rétiré'
}

@Entity()
export class Postulants  extends BaseEntity  {

   @PrimaryGeneratedColumn()
   id?: number
  
   @Column()
   keycloakId?: string;

   @Column()
   id_job?: number;

   @Column({ nullable: true })
   id_cv_doc?: number;

   @Column({ nullable: true })
   id_lm_doc?: number;
   
   @Column({ nullable: true })
   id_diplome_doc?: number;

   @Column({ nullable: true })
   id_certificat_doc?: number;

   @Column()
   entreprise_id?: number;
   
  @Column({
    type: "enum",
    enum: Etat_demande,
    default: Etat_demande.encours,
  })
  etat_demande?: Etat_demande;

}


