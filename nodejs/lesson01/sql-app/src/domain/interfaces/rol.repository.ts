import { Rol } from "../models/Rol.model";

export interface RolRepository{
    findById(id: string): Promise<Rol | null>;
    createRol(user: Rol): Promise<Rol>;
    updateRol(id: string, rol: Rol): Promise<Rol | null>;
    deleteRol(id: string): Promise<Rol | null>;
}