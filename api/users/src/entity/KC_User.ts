import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './BaseEntity';

@Entity()
export class KcUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  sub?: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: "Votre prénom" })
  given_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: "Votre Nom" })
  family_name: string;
  
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ nullable: true })
  salt:string;

  
  @Column({ nullable: true, default: 1})
  static_role: number;

}