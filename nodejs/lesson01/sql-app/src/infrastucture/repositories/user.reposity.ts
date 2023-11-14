import { UserDto } from "../../app/dtos/user.dto";
import { AppDataSource } from "../config/dataSource";
import { UserEntity } from "../entities/user.entity";
import logger from "../logger/logger";
import { UserRepository } from "./../../domain/interfaces/user.repository";
import { User } from "./../../domain/models/User.model";

export class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User | null> {
    logger.info("Alguna información relevante");
    const userEntity = await AppDataSource.getRepository(UserEntity).findOneBy({
      id,
    });
    return userEntity ? new User(userEntity) : null;
  }

  async createUser(user: User): Promise<User> {
    // TODO: set user values
    logger.info("Creando usuario en Repository");
    const dataUser = {
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt || new Date(),
      lastLogin: user.lastLogin || undefined,
      roleId: user.roleId,
    };
    logger.debug("Datos del nuevo usuario: ", dataUser);
    const userEntity = AppDataSource.getRepository(UserEntity).create(dataUser);

    const userResponse = await AppDataSource.getRepository(UserEntity).save(
      userEntity
    );
    const userNew = new User({
      id: userResponse.id,
      username: userResponse.username,
      email: userResponse.email,
      passwordHash: userResponse.passwordHash,
      createdAt: userResponse.createdAt,
      lastLogin: userResponse.lastLogin,
      roleId: userResponse.roleId,
    });
    logger.debug("Datos del nuevo usuario: ", userNew);
    return userNew;
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    logger.info("Actualizando información de usuario en Repository");

    // Buscar el usuario por su ID
    const userEntity = await AppDataSource.getRepository(UserEntity).findOneBy({id});

    if (userEntity) {
      // Actualizar los campos del usuario con los nuevos datos
      userEntity.username = user.username || userEntity.username;
      userEntity.email = user.email || userEntity.email;
      userEntity.passwordHash = user.passwordHash || userEntity.passwordHash;
      userEntity.lastLogin = user.lastLogin || userEntity.lastLogin;
      userEntity.roleId = user.roleId || userEntity.roleId;

      // Guardar los cambios en la base de datos
      await AppDataSource.getRepository(UserEntity).save(userEntity);

      // Crear un nuevo objeto User con los datos actualizados
      const updatedUser = new User({
        id: userEntity.id,
        username: userEntity.username,
        email: userEntity.email,
        passwordHash: userEntity.passwordHash,
        createdAt: userEntity.createdAt,
        lastLogin: userEntity.lastLogin,
        roleId: userEntity.roleId,
      });
      logger.debug("Usuario actualizado: ", updatedUser);
      return updatedUser;
    } else {
      logger.error("Usuario no encontrado para actualizar");
      return null;
    }
  }
  async deleteUser(id: string): Promise<User | null> {
    logger.info('Eliminando usuario en Repository');

    // Buscar el usuario por su ID
    const userEntity = await AppDataSource.getRepository(UserEntity).findOneBy({ id });

    if (userEntity) {
        // Eliminar el usuario de la base de datos
        await AppDataSource.getRepository(UserEntity).remove(userEntity);

        logger.debug('Usuario eliminado correctamente');
        return userEntity;
    } else {
        logger.error('Usuario no encontrado para eliminar');
        return null;
    }
  }
}
