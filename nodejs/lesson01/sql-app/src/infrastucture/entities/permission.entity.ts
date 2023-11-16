import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { IPermissionEntity } from "../../domain/entities/IPermissionEntity";
import { Rol } from "../../domain/models/Rol.model";

@Entity()
export class PermissionEntity implements IPermissionEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToMany(() => Rol)
    roles: Rol[]
}