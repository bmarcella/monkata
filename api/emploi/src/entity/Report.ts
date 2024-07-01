import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Report extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    report?: string;

    @Column()
    keycloakId?: string;

    @Column() 
    id_job?: number;

    @Column({ nullable: true }) 
    viewBy?: string;
}

