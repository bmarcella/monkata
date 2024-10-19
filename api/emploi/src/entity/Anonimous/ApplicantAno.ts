import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";



@Entity()
export class ApplicantAno extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'bytea', nullable: false }) // For PostgreSQL, use 'blob' for MySQL, 'varbinary' for SQL Server
    cv_user!: Buffer;


    @Column({ type: 'bytea', nullable: true }) // For PostgreSQL, use 'blob' for MySQL, 'varbinary' for SQL Server
    lm_user!: Buffer;

    @Column({  nullable: false })
    userId?: number;


    @Column({  nullable: false })
    id_job?: number;


    @Column({ nullable: false })
    email_job!: string;

    @Column({  nullable: false, default: 0 })
    send?: number;
    
}

