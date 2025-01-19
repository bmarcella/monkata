import { Entity, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, Tree } from "typeorm";
import { BaseEntity } from "../BaseEntity";

export enum UnityType {
    direction = 'direction',
    departement = 'departement',
    service = "service",
    poste = "poste"
  }
  
@Entity()
@Tree("closure-table")
export class Unity  extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string;

    @Column({ nullable: true})
    isPoste?: boolean;

    @Column({
        type: "enum",
        enum: UnityType,
        default: UnityType.poste,
        nullable: true
      })
      type_unity?: UnityType;

    @Column()
    icon?: string;
    
    @Column()
    description: string

    @TreeChildren()
    children: Unity[]

    @TreeParent()
    parent: Unity;
}