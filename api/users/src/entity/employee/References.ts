import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Emp";


@Entity()
export class References {
  @PrimaryGeneratedColumn()
  id? : number;

  @Column({ nullable: true})
  nom_complet?: string;
  
  @Column({ nullable: true})
  titre?: string;

  @Column({ nullable: true})
  institution?: string;

  @Column({ nullable: true})
  phone_a?: string;

  @Column({ nullable: true})
  phone_b?: string;

  @Column({ nullable: true})
  email?: string;
  // In Etudes entity
  @ManyToOne(() => Employee, employee => employee.etudes)
  employee?: Employee;

}



