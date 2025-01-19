import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Permission, Userroleapp } from './Urole';

@Entity()
export class Rolepermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Userroleapp, userroleapp => userroleapp.rolepermissions)
    userroleapp: Userroleapp;

    @ManyToOne(() => Permission, permission => permission.rolepermissions)
    permission: Permission;
}
