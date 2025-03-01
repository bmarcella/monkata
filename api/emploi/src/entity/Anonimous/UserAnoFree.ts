import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class UserAnoFree extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;


  @Column()
  lastName?: string;


  @Column({ nullable: true })
  telephone!: string;


  @Column({ nullable: true, unique: true })
  email!: string;

  @Column({ nullable: false })
  country!: string;

  @Column({ nullable: false })
  city!: string;

  @Column({ nullable: false })
  domaine_1!: string;

  @Column({ nullable: true })
  exp_1!: number;

  @Column({ nullable: true })
  domaine_2!: string;

  @Column({ nullable: true })
  exp_2!: number;

  @Column({ nullable: true })
  domaine_3!: string;

  @Column({ nullable: true })
  exp_3!: number;

  @Column({ nullable: true, default: true })
  stage!: boolean;

  @Column({ nullable: true, default: true })
  benevolat!: boolean;

  @Column({ nullable: true, default: true })
  relocate!: boolean;


  @Column({ type: 'bytea', nullable: false }) // For PostgreSQL, use 'blob' for MySQL, 'varbinary' for SQL Server
  cv_user!: Buffer;

  @Column({ type: 'bytea', nullable: true }) // For PostgreSQL, use 'blob' for MySQL, 'varbinary' for SQL Server
  dc_user!: Buffer;

  @Column({ nullable: true })
  salary_min!: number;

  @Column({ nullable: true })
  salary_max!: number;


  @Column({ nullable: false })
  niv_academique!: string;

  @Column({ nullable: true })
  type_emp!: string;

}


