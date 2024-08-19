import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_Cv } from "./User_Cv";
import { BaseEntity } from "./BaseEntity";



@Entity()
export class Skills  extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id? : number;
  
  @Column({  nullable: true })
  name?: string;
  
  @Column({  nullable: true })
  years?: string;

 @ManyToOne(() => User_Cv, userCv => userCv.worksExp)
 userCv?: User_Cv;


}



