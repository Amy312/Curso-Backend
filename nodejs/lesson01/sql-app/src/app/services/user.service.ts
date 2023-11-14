import { IUserEntity } from '../../domain/entities/IUserEntity';
import { User } from '../../domain/models/User.model';
import logger from '../../infrastucture/logger/logger';
import { CreateUserDTO } from '../dtos/create.user.dto';
import { UpdateUserDTO } from '../dtos/update.user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserRepository } from './../../domain/interfaces/user.repository';

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUserById(id: string): Promise<UserDto | null> {
        logger.info("estoy dentro del UserById Service");
        logger.debug("esto es");
        const user = await this.userRepository.findById(id);
        // log.debug user

        if (!user) return null;

        const userResponse: UserDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin
        }
        // log.info user obtenido exitosamente
        return userResponse;
    }

    async createUser(userDto: CreateUserDTO): Promise<User> {
        // info 
        const userEntity: IUserEntity = {
            username: userDto.username,
            email: userDto.email,
            passwordHash: userDto.password,
            roleId: userDto.roleId,
            lastLogin: new Date()
        };
        const newUser = new User(userEntity);
        return this.userRepository.createUser(newUser);
    }

    async updateUser(id: string, userDto: UpdateUserDTO): Promise<User | null> {
        // info 
        const userEntity: IUserEntity = {
            username: userDto?.username,
            email: userDto?.email,
            passwordHash: userDto?.password,
            roleId: userDto?.roleId,
            lastLogin: new Date()
        };
        const newUser = new User(userEntity);
        return this.userRepository.updateUser(id, newUser)
    }

    async deleteUser(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.deleteUser(id);
        // info 
        if (!user) return null;

        const userResponse: UserDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin
        }
        // log.info user obtenido exitosamente
        return userResponse;
    }
}