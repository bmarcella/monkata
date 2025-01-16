import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Logo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'bytea', nullable: true }) // For PostgreSQL, use 'blob' for MySQL, 'varbinary' for SQL Server
    data?: Buffer;

    @Column({ nullable: false})
    mime!: string;

    @Column({ unique : true }) 
    id_ent?: number;
}

