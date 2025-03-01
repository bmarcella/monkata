import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Emp";

export enum Type_etudes {
  universitaire = 'universitaire',
  professionels = 'professionels',
  etudes_classiques = "etudes classiques"

}

@Entity()
export class Etudes {
  @PrimaryGeneratedColumn()
  id? : number;


  @Column({ nullable: true})
  domaine?: string;

  @Column({ nullable: true})
  degree?: string;

  @Column({ nullable: true})
  institution?: string;


  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  date_debut!: string;


@Column({ type: 'date', nullable: true})
date_fin!: string;
@Column({
  type: "enum",
  enum: Type_etudes,
  default: Type_etudes.universitaire,
})
type_etudes?: Type_etudes;

// In Etudes entity
@ManyToOne(() => Employee, employee => employee.etudes)
employee?: Employee;

@Column({  nullable: true })
country?: string;

@Column({  nullable: true })
city?: string;

}



