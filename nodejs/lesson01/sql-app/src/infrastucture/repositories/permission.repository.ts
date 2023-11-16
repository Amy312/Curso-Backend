import { Permission } from "../../domain/models/Permission.model";
import { AppDataSource } from "../config/dataSource";
import { PermissionEntity } from "../entities/permission.entity";
import logger from "../logger/logger";
import { PermissionRepository } from './../../domain/interfaces/permission.repository';

export class PermissionRepositoryImpl implements PermissionRepository {
  async findById(id: string): Promise<Permission | null> {
    logger.info("Alguna información relevante");
    const permissionEntity = await AppDataSource.getRepository(PermissionEntity).findOneBy({
      id,
    });
    return permissionEntity ? new Permission(permissionEntity) : null;
  }

  async createPermission(permission: Permission): Promise<Permission> {
    // TODO: set user values
    logger.info("Creando permiso en Repository");
    const dataPermission = {
      name: permission.name,
      description: permission.description
    };
    logger.debug("Datos del nuevo permiso: ", dataPermission);
    const permissionEntity = AppDataSource.getRepository(PermissionEntity).create(dataPermission);

    const permissionResponse = await AppDataSource.getRepository(PermissionEntity).save(
        permissionEntity
    );
    const permissionNew = new Permission({
      id: permissionResponse.id,
      name: permissionResponse.name,
      description: permissionResponse.description,
      roles: permissionResponse.roles
    });
    logger.debug("Datos del nuevo Permiso: ", permissionNew);
    return permissionNew;
  }

  async updatePermission(id: string, permission: Permission): Promise<Permission | null> {
    logger.info("Actualizando información de Permiso en Repository");
    // Buscar el usuario por su ID
    const permissionEntity = await AppDataSource.getRepository(PermissionEntity).findOneBy({id});

    if (permissionEntity) {
      // Actualizar los campos del usuario con los nuevos datos
      permissionEntity.name = permission.name || permissionEntity.name;
      permissionEntity.description = permission.description || permissionEntity.description;


      // Guardar los cambios en la base de datos
      await AppDataSource.getRepository(PermissionEntity).save(permissionEntity);

      // Crear un nuevo objeto User con los datos actualizados
      const updatedPermission = new Permission({
        id: permissionEntity.id,
        name: permissionEntity.name,
        description: permissionEntity.description,
        roles: permissionEntity.roles
      });
      logger.debug("Permiso actualizado: ", updatedPermission);
      return updatedPermission;
    } else {
      logger.error("Permiso no encontrado para actualizar");
      return null;
    }
  }
  async deletePermission(id: string): Promise<Permission | null> {
    logger.info('Eliminando permiso en Repository');

    // Buscar el usuario por su ID
    const permissionEntity = await AppDataSource.getRepository(PermissionEntity).findOneBy({ id });

    if (permissionEntity) {
        await AppDataSource.getRepository(PermissionEntity).remove(permissionEntity);
        logger.debug('Permiso eliminado correctamente');
        return permissionEntity;
    } else {
        logger.error('Permiso no encontrado para eliminar');
        return null;
    }
  }
}
