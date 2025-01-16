import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class UserAno extends BaseEntity {

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

}


