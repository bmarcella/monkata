
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../emploi/src/entity/BaseEntity";
import { Rolepermission } from "./Rperm";




@Entity()
export class Userroleapp extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column( { nullable: false }) 
    idAppEnt?: number;

    @Column( { nullable: false }) 
    name!: string ;

    @Column({ nullable: true })
    description?: string;
    
    @Column( { nullable: false, default : false })
    canChange?: boolean;
   
    @OneToMany(() => Rolepermission, rolepermission => rolepermission.userroleapp,  { nullable: true})
    rolepermissions?: Rolepermission[];

}



@Entity()
export class Permission extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: false })
    appName?: string;

    @OneToMany(() => Rolepermission, rolepermission => rolepermission.permission, { nullable: true})
    rolepermissions?: Rolepermission[];

}






