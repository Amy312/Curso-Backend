import { IRolEntity } from '../../domain/entities/IRolEntity';
import { RolRepository } from '../../domain/interfaces/rol.repository';
import { Rol } from '../../domain/models/Rol.model';
import logger from '../../infrastucture/logger/logger';
import { CreateRolDto } from '../dtos/create.rol';
import { RolDto } from '../dtos/rol.dto';
import { Permission } from './../../domain/models/Permission.model';

export class RolService {
    constructor(private rolRepository: RolRepository) { }

    async getRolById(id: string): Promise< RolDto | null > {
        logger.info("estoy dentro del GET de ROL by ID Service");
        logger.debug("prueba de si funca el debug, parece que no ");
        const rol = await this.rolRepository.findById(id);
        if (!rol) return null;

        const rolResponse: RolDto = {
            id: rol.id,
            name: rol.name,
            description: rol.description,
        }
        return rolResponse;
    }

    async createRol(rolDto: CreateRolDto ): Promise<Rol> {
        // info 
        const rolEntity: IRolEntity = {
            name: rolDto.name,
            description: rolDto.description,
           // permissions: null

        };
        const newRol = new Rol(rolEntity);
        return this.rolRepository.createRol(newRol);
    }

    async updateRol(id: string, rolDto: CreateRolDto): Promise<Rol> {
        // info 
        const rolEntity: IRolEntity = {
            name: rolDto?.name,
            description: rolDto?.description,
           // permissions: null
        };
        const newRol = new Rol(rolEntity);
        return this.rolRepository.updateRol(id, newRol);
    }

    async deleteRol(id: string): Promise<RolDto | null> {
        const rol = await this.rolRepository.deleteRol(id);
        // info 
        if (!rol) return null;

        const rolResponse: RolDto = {
            id: rol.id,
            name: rol.name,
            description: rol.description,
        }
        return rolResponse;
    }
}