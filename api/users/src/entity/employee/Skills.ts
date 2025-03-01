import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Emp";
import { BaseEntity } from "../BaseEntity";



@Entity()
export class Skills  extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id? : number;
  
  @Column({  nullable: true })
  name?: string;
  
  @Column({  nullable: true })
  years?: string;

 @ManyToOne(() => Employee, employee => employee.worksExp)
 employee?: Employee;


}



