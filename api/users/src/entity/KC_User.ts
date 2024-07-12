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

  @Column()
  given_name: string;

  @Column()
  family_name: string;
  
  @Column()
  email: string


  @Column()
  password: string;

  @Column({ nullable: true })
  salt:string;

  
  @Column({ nullable: true, default: 1})
  static_role: number;

}