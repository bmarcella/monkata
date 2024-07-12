import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Etudes } from './Etudes';
import { LanguageSkills } from './LanguageSkills';
import { References } from './References';
import { Skills } from './Skills';
import { Works_exp } from './Works_exp';

// export enum Type_User {
//   Employe = 'Employé',
//   Etudiant = "Etudiant",
//   Medecin =  "Medecin"
// }

export enum Dispo {
  Consultant,
  Temps_partiel,
  Temps_plein,
  Non_disponible,
  Tout
}

@Entity()
export class User_Cv {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column({ nullable: true })
  title_prof?: string;

  @Column()
  lastName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sexe?: string;

  @Column({ unique: true })
  id_user?: number;

  @Column({ unique: true, nullable: true })
  keycloakId?: string;

  @Column({ nullable: true })
  profile!: string;

  @Column({ nullable: true })
  annee_debut!: number;

  @Column({ nullable: true })
  telephone_a!: string;

  @Column({ nullable: true })
  telephone_b!: string;

  @Column({ nullable: true })
  email_contact!: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  linkedin?: string;
  // UNIQUE
  @Column({ nullable: true, unique: true })
  nin?: string;

  @Column({ nullable: true, unique: true })
  nif?: string;

  @Column({ nullable: true, unique: true  })
  passport?: string;

    // UNIQUE

  @Column({ nullable: true })
  street!: string;

  @OneToMany(() => Works_exp, worksExp => worksExp.userCv, { nullable: true, cascade: true })
  worksExp?: Works_exp[];

  @OneToMany(() => Etudes, etudes => etudes.userCv, { nullable: true, cascade: true })
  etudes?: Etudes[];

  @OneToMany(() => Skills, skills => skills.userCv, { nullable: true, cascade: true })
  skills?: Skills[];

  @OneToMany(() => LanguageSkills, skills => skills.userCv, { nullable: true, cascade: true })
  languageSkills?: LanguageSkills[];

  @OneToMany(() => References, obj => obj.userCv, { nullable: true, cascade: true })
  references?: References[];

  @Column({
    type: "enum",
    enum: Dispo,
    default: Dispo.Tout,
    nullable: true
  })
  disponibilte?: Dispo;

  @Column({ nullable: true })
  relocate?: boolean;

  @Column({ nullable: true, default: 0 })
  attempt!: number;

  @Column({ type: 'timestamptz', nullable: true })
  date_last_attempt?: Date;
}


