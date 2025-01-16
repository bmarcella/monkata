import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
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


@Entity()
export class Jobs extends BaseEntity  {

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  titre_job?: string;

  @Column()
  categorie?: string;
  
  @Column()
  description?: string;

  
  @Column({nullable: true})
  exigences?: string;

  
  @Column({
    type: "enum",
    enum: App_Reception,
    default: App_Reception.memploi,
  })
  app_Reception?: App_Reception;

  @Column({
    type: "enum",
    enum: Currency,
    default: Currency.HTG,
  })
  currency?: Currency;

  @Column({
    type: "enum",
    enum: Type_contrat,
    default: Type_contrat.permanent,
  })
  type_contrat?: Type_contrat;

  @Column({
    type: "enum",
    enum: Env_Work,
    default: Env_Work.presentiel,
  })
env_de_travail?: Env_Work;

@Column({
      type: "enum",
      enum: Horaire_de_travail,
      default: Horaire_de_travail.temps_plein,
})
horaire_de_travail?: Horaire_de_travail;

@Column({nullable: true})
lien_to_apply?: string;


@Column({nullable: true})
email_to_apply?: string;


@Column({nullable: true})
phone_to_apply?: string;

@Column({nullable: true})
benefits?: string;

@Column({default: false})
publish?: boolean;

@Column({
    type: "enum",
    enum: Periode_salaire,
    default: Periode_salaire.annuel,
})
periode_salaire?: Periode_salaire;


@Column({ nullable: true})
salaire?: number;

@Column({ default: false })
job_permanent?: boolean;

@Column({ nullable: true, type: 'timestamptz' }) 
date_echeance?: Date;


@Column()
entreprise_id?: number;

@Column()
create_by?: string;

@Column({ nullable: true})
country?: string;

@Column({ nullable: true})
etat?: string;

@Column({ nullable: true})
ville?: string;

@Column({ default: false })
is_lm_require?: boolean;

@Column({ default: false })
is_cv_require?: boolean;

@Column({ default: false })
is_diplome_require?: boolean;

@Column({ default: false })
is_certificat_require?: boolean;

@Column({ default: false })
closed?: boolean;

@Column({ default: false })
block_by_admin?: boolean;

}



