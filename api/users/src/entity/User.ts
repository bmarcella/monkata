import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;

    @Column()
    password?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    sexe?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    avatar?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column()
    email?: string;


    @Column({  nullable: true })
    portfolio?: string;

    @Column()
    keycloakId?: string;

    @Column({ nullable: true , default: false })
    approuved?: boolean;


    @Column({ nullable: true })
    reset_code?: string;

    @Column({ nullable: true, default: 0 })
    attempt: number;

    @Column({ nullable: true })
    date_block: Date; 

}