import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Bank {


  @PrimaryGeneratedColumn()
  id?: number


  @Column({ nullable: true, unique: true})
  name: string;
   
  @Column({ nullable: true})
  description: string;

  @Column()
  country: string;


  @Column({ nullable: true})
  etat: string;

  @Column({ nullable: true})
  ville : string;


  @Column({ nullable: true})
  rue : string;


}