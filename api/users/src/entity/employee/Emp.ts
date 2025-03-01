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
import { InfoBank } from './InfoBank';


export enum Dispo {
  Consultant,
  Temps_partiel,
  Temps_plein,
}

@Entity()
export class Employee {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column({ nullable: false})
  id_AppEnt: number;

  @Column()
  lastName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sexe?: string;


  @Column({ nullable: true })
  annee_debut!: number;

  @Column({ nullable: true })
  salary!: number;

  @Column({ nullable: true })
  prev_salary!: number;

  @Column({ nullable: true, default: false })
  approved_salary!: boolean;

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

  @OneToMany(() => Works_exp, worksExp => worksExp.employee, { nullable: true, cascade: true })
  worksExp?: Works_exp[];

  @OneToMany(() => Etudes, etudes => etudes.employee, { nullable: true, cascade: true })
  etudes?: Etudes[];

  @OneToMany(() => Skills, skills => skills.employee, { nullable: true, cascade: true })
  skills?: Skills[];

  @OneToMany(() => LanguageSkills, skills => skills.employee, { nullable: true, cascade: true })
  languageSkills?: LanguageSkills[];

  @OneToMany(() => References, obj => obj.employee, { nullable: true, cascade: true })
  references?: References[];

  @OneToMany(() => InfoBank, obj => obj.employee, { nullable: true, cascade: true })
  infoBank?: InfoBank[];
  
}


