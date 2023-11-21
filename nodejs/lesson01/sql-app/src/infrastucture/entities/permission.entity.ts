import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { IPermissionEntity } from "../../domain/entities/IPermissionEntity";
import { Rol } from "../../domain/models/Rol.model";
 import { RolEntity } from "./rol.entity";

@Entity()
export class PermissionEntity implements IPermissionEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToMany(() => RolEntity, (rol) => rol.permissions)
    roles: RolEntity[];


}