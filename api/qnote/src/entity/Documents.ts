import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export enum Type_Doc {
    cv = "Cv",
    diplome = "Diplome",
    certificat = "Certificat",
    lettre_motivation = "Lettre motivation",
    Carte_identite = " Carte d'identité",
    passport = "Passeport",
    permis_de_conduire = "Permis de conduire",
    Certificat_de_police = "Certificat de police",
    Certificat_de_travail = "Certificat de Travail",
    autres = "Autres",
  }

@Entity()
export class Documents extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "enum",
        enum: Type_Doc,
        default: Type_Doc.cv,
    })
    type_doc?: Type_Doc;

    @Column({ type: 'bytea', nullable: true }) // For PostgreSQL, use 'blob' for MySQL, 'varbinary' for SQL Server
    data?: Buffer;

    @Column()
    mime?: string;

    @Column({default: "document" })
    name?: string;

    @Column()
    keycloakId?: string;

    @Column()
    size?: number;

}

