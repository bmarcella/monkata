import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ViewJob  extends BaseEntity  {

  @PrimaryGeneratedColumn()
  id? : number;
  
  @Column({  nullable: false })
  id_job?: number;

  @Column({  nullable: true })
  ip?: string;
  
  @Column({  nullable: true })
  keycloakId?: string;
  
  @Column({  nullable: true })
  view_by_admin?: number;

  @Column({ nullable: true })
  date_view_by_admin?: Date;

}
