import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Contact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false})
    full_name?: string;

    @Column() 
    email?: string;

    @Column({ nullable: false})
    subject?: string;


    @Column({ nullable: false})
    message?: string;


}
