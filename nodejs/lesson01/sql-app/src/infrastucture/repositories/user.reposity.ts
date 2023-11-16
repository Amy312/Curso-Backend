import { UserDto } from "../../app/dtos/user.dto";
import { AppDataSource } from "../config/dataSource";
import { UserEntity } from "../entities/user.entity";
import logger from "../logger/logger";
import { UserRepository } from "./../../domain/interfaces/user.repository";
import { User } from "./../../domain/models/User.model";
import bcrypt from "bcrypt";

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({
      where: { email },
      relations: ["role"],
    });
    return user ? new User(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    logger.info("Alguna información relevante");
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    return user ? new User(user) : null;
  }

  async createUser(user: User): Promise<User> {
    const userRepository = AppDataSource.getRepository(UserEntity);

    // TODO: set user values
    logger.info("Creando usuario en Repository");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.passwordHash, salt);
    const userEntity = userRepository.create({
      username: user.username,
      email: user.email,
      passwordHash: hash,
      createdAt: user.createdAt || new Date(),
      lastLogin: user.lastLogin || null,
      role: user.role,
    });
    const userResponse = await userRepository.save(userEntity);

    return new User({
      id: userResponse.id,
      username: userResponse.username,
      email: userResponse.email,
      passwordHash: userResponse.passwordHash,
      createdAt: userResponse.createdAt,
      lastLogin: userResponse.lastLogin,
      role: userResponse.role,
    });
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    logger.info("Actualizando información de usuario en Repository");

    // Buscar el usuario por su ID
    const repository = AppDataSource.getRepository(UserEntity);
    const userN = await repository.findOneBy({ id });

    if (!userN) {
      logger.error(
        `UserRepository: Error al modificar al usuario con ID: ${id}.`
      );
      throw new Error("Usuario no encontrado");
    }

    // if (user.role.id !== updateData.roleId)
    // get role a partir del updateData.roleId
    // if (!role)
    // user.role = role

    repository.merge(userN, user);
    const updatedUser = await repository.save(userN);
    return updatedUser;
  }
  async deleteUser(id: string): Promise<User | null> {
    logger.info("Eliminando usuario en Repository");

    // Buscar el usuario por su ID
    const userEntity = await AppDataSource.getRepository(UserEntity).findOneBy({
      id,
    });

    if (userEntity) {
      // Eliminar el usuario de la base de datos
      await AppDataSource.getRepository(UserEntity).remove(userEntity);

      logger.debug("Usuario eliminado correctamente");
      return userEntity;
    } else {
      logger.error("Usuario no encontrado para eliminar");
      return null;
    }
  }
}
