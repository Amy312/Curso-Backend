import { IPermissionEntity } from '../../domain/entities/IPermissionEntity';
import { PermissionRepository } from '../../domain/interfaces/permission.repository';
import { Permission } from '../../domain/models/Permission.model';
import logger from '../../infrastucture/logger/logger';
import { PermissionDto } from '../dtos/permission.dto';
import { CreatePermissionDto } from './../dtos/create.permission.dto';

export class PermissionService {
    constructor(private permissionRepository: PermissionRepository) { }

    async getPermissionById(id: string): Promise< PermissionDto | null > {
        logger.info("estoy dentro del GET de PERMISSION by ID Service");
        logger.debug("prueba de si funca el debug, parece que no ");
        const permission = await this.permissionRepository.findById(id);
        if (!permission) return null;

        const permissionResponse: PermissionDto = {
            id: permission.id,
            name: permission.name,
            description: permission.description,
        }
        return permissionResponse;
    }

    async createPermission(permissionDto: CreatePermissionDto ): Promise<Permission> {
        // info 
        const permissionEntity: IPermissionEntity = {
            name: permissionDto.name,
            description: permissionDto.description,
            roles: null
        };
        const newPermission = new Permission(permissionEntity);
        return this.permissionRepository.createPermission(newPermission);
    }

    async updatePermission(id: string, permissionDto: CreatePermissionDto): Promise<Permission | null> {
        // info 
        const permissionEntity: IPermissionEntity = {
            name: permissionDto?.name,
            description: permissionDto?.description,
            roles: null
        };
        const newPermission = new Permission(permissionEntity);
        return this.permissionRepository.updatePermission(id, newPermission);
    }

    async deletePermission(id: string): Promise<PermissionDto | null> {
        const permission = await this.permissionRepository.deletePermission(id);
        // info 
        if (!permission) return null;

        const permissionResponse: PermissionDto = {
            id: permission.id,
            name: permission.name,
            description: permission.description,
        }
        // log.info user obtenido exitosamente
        return permissionResponse;
    }
}