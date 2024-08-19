import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User_Cv } from "./User_Cv";


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
  @ManyToOne(() => User_Cv, userCv => userCv.etudes)
  userCv?: User_Cv;

}



