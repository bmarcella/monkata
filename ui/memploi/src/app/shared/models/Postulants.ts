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
  obtenu = 'Obtenu'
}

export class Postulants  extends BaseEntity  {


   id?: number

   keycloakId?: string;

   id_job?: number;

   id_cv_doc?: number;

   id_lm_doc?: number;

   id_diplome_doc?: number;

   id_certificat_doc?: number;
   entreprise_id?: number;
   etat_demande?: Etat_demande;

}


