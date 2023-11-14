import { UserDto } from '../../app/dtos/user.dto';
import { AppDataSource } from '../config/dataSource';
import { UserEntity } from '../entities/user.entity';
import logger from '../logger/logger';
import { UserRepository } from './../../domain/interfaces/user.repository';
import { User } from './../../domain/models/User.model';

export class UserRepositoryImpl implements UserRepository {
    
    async findById(id: string): Promise<User | null> {
        logger.info('Alguna información relevante');
        const userEntity = await AppDataSource.getRepository(UserEntity).findOneBy({ id });
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
            roleId: user.roleId
        }
        logger.debug("Datos del nuevo usuario: ", dataUser)
        const userEntity = AppDataSource.getRepository(UserEntity).create(dataUser);

        const userResponse = await AppDataSource.getRepository(UserEntity).save(userEntity);
        const userNew = new User({
            id: userResponse.id,
            username: userResponse.username,
            email: userResponse.email,
            passwordHash: userResponse.passwordHash,
            createdAt: userResponse.createdAt,
            lastLogin: userResponse.lastLogin,
            roleId: userResponse.roleId
        })
        logger.debug("Datos del nuevo usuario: ",userNew);
        return userNew;
    }

    async updateUser(id: string, user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async deleteUser(id: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }

}
