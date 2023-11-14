import { RolRepository } from "../../domain/interfaces/rol.repository";
import { Rol } from "../../domain/models/Rol.model";
import { AppDataSource } from "../config/dataSource";
import { RolEntity } from "../entities/rol.entity";
import logger from "../logger/logger";

export class RolRepositoryImpl implements RolRepository {
  async findById(id: string): Promise<Rol | null> {
    logger.info("Alguna información relevante");
    const rolEntity = await AppDataSource.getRepository(RolEntity).findOneBy({
      id,
    });
    return rolEntity ? new Rol(rolEntity) : null;
  }

  async createRol(rol: Rol): Promise<Rol> {
    // TODO: set user values
    logger.info("Creando usuario en Repository");
    const dataRol = {
      name: rol.name,
      description: rol.description
    };
    logger.debug("Datos del nuevo usuario: ", dataRol);
    const rolEntity = AppDataSource.getRepository(RolEntity).create(dataRol);

    const rolResponse = await AppDataSource.getRepository(RolEntity).save(
      rolEntity
    );
    const rolNew = new Rol({
      id: rolResponse.id,
      name: rolResponse.name,
      description: rolResponse.description
    });
    logger.debug("Datos del nuevo usuario: ", rolNew);
    return rolNew;
  }

  async updateRol(id: string, rol: Rol): Promise<Rol | null> {
    logger.info("Actualizando información de rol en Repository");
    // Buscar el usuario por su ID
    const rolEntity = await AppDataSource.getRepository(RolEntity).findOneBy({id});

    if (rolEntity) {
      // Actualizar los campos del usuario con los nuevos datos
      rolEntity.name = rol.name || rolEntity.name;
      rolEntity.description = rol.description || rolEntity.description;


      // Guardar los cambios en la base de datos
      await AppDataSource.getRepository(RolEntity).save(rolEntity);

      // Crear un nuevo objeto User con los datos actualizados
      const updatedRol = new Rol({
        id: rolEntity.id,
        name: rolEntity.name,
        description: rolEntity.description
      });
      logger.debug("Rol actualizado: ", updatedRol);
      return updatedRol;
    } else {
      logger.error("Rol no encontrado para actualizar");
      return null;
    }
  }
  async deleteRol(id: string): Promise<Rol | null> {
    logger.info('Eliminando rol en Repository');

    // Buscar el usuario por su ID
    const rolEntity = await AppDataSource.getRepository(RolEntity).findOneBy({ id });

    if (rolEntity) {
        // Eliminar el usuario de la base de datos
        await AppDataSource.getRepository(RolEntity).remove(rolEntity);
        logger.debug('Rol eliminado correctamente');
        return rolEntity;
    } else {
        logger.error('Rol no encontrado para eliminar');
        return null;
    }
  }
}
