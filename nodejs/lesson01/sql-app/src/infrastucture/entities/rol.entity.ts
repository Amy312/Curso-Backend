import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IRolEntity } from "../../domain/entities/IRolEntity";
@Entity()
export class RolEntity implements IRolEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'varchar'})
    name!: string;

    @Column({ type: 'text'})
    description!: string;
}