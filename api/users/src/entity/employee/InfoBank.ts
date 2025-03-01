import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Emp";
import { BaseEntity } from "../BaseEntity";



@Entity()
export class InfoBank  extends BaseEntity  {

@PrimaryGeneratedColumn()
id? : number;
  


@Column({ nullable : false })
id_bank?: number;


@Column({ nullable : false })
numbero_compte?: string;


@Column({ nullable : false })
nom_compte?: string;


@Column({ nullable : true })
code_iban: string;

@Column({ nullable : true })
code_swift: string;

@ManyToOne(() => Employee, employee => employee.infoBank, {  nullable: false})
employee?: Employee;

@Column({ nullable : false })
active?: boolean;

}



