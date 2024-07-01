import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ unique: true })
  id_user?: number;

  @Column({ unique: true, nullable: false })
  keycloakId?: string;

  @Column({ nullable: true })
  email!: string;

}


