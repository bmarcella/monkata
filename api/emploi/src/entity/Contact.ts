import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './BaseEntity';

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

    
    @Column({ nullable: false, default : false })
    isReport?: boolean ;

    @Column({ nullable: true })
    id_job?: number;

    @Column({ nullable: true, unique: true })
    token?: string;

    @Column({ nullable: true })
    keycloakId?: string;

}
