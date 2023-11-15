import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { IUserEntity } from '../../domain/entities/IUserEntity';
import { RolEntity } from "./rol.entity";
import { IRolEntity } from "../../domain/entities/IRolEntity";
@Entity()
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'varchar' })
    username!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'varchar' })
    passwordHash!: string;

    @Column({ type: 'timestamp' })
    createdAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin!: Date;

    @ManyToOne(() => RolEntity)
    @JoinColumn({ name: 'roleId'})
    role: IRolEntity;
}