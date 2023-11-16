import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";
import { IRolEntity } from "../../domain/entities/IRolEntity";
import { Permission } from "../../domain/models/Permission.model";

@Entity()
export class RolEntity implements IRolEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @JoinTable()
    @ManyToMany(() => Permission)
    permissions: Permission[]
}