import { Permission } from "../models/Permission.model";

export interface PermissionRepository{
    findById(id: string): Promise<Permission | null>;
    createPermission(user: Permission): Promise<Permission>;
    updatePermission(id: string, rol: Permission): Promise<Permission | null>;
    deletePermission(id: string): Promise<Permission | null>;
}