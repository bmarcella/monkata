import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../../../emploi/src/entity/BaseEntity";
import { RHPermission } from "./PermissionValue";
import { Rolepermission } from "./Rperm";

@Entity()
export class Userroleapp extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    keycloakId?: string;

    @Column( { nullable: false }) 
    name?: string;

    @Column( { nullable: false }) 
    appName?: string;
   
    @OneToMany(() => Rolepermission, rolepermission => rolepermission.userroleapp,  { nullable: true})
    rolepermissions: Rolepermission[];

}

@Entity()
export class Permission extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false, unique: true })
    name?: RHPermission;

    @Column({ nullable: false })
    description?: string;

    @Column({ nullable: false })
    appName?: string;

    @OneToMany(() => Rolepermission, rolepermission => rolepermission.permission, { nullable: true})
    rolepermissions: Rolepermission[];

}






