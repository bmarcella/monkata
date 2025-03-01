import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";



@Entity()
export class Affection   extends BaseEntity  {

@PrimaryGeneratedColumn()
id? : number;
  


@Column({ nullable : false })
id_employee?: number;


@Column({ nullable : false })
id_poste?: number;



@Column({ nullable : false })
id_burreau?: number;


@Column({ nullable : true })
reason ?: number;



@Column({ nullable : false })
active?: boolean;

@Column({ nullable : false })
date_debut?: Date;

@Column({ nullable : true })
date_fin?: Date;

}



