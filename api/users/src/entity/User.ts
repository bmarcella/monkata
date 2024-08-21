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

  @Column({ type: 'varchar', length: 255, nullable: false, default: "Votre prénom" })
  firstName?: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: "Votre nom" })
  lastName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sexe?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email?: string;


  @Column({ nullable: true })
  portfolio?: string;

  @Column()
  keycloakId?: string;

  @Column({ nullable: true, default: true })
  approuved?: boolean;


  @Column({ nullable: true })
  reset_code?: string;

  @Column({ nullable: true, default: 0 })
  attempt: number;

  @Column({ nullable: true })
  date_block: Date;

  @Column({ nullable: true })
  static_role: number;

}