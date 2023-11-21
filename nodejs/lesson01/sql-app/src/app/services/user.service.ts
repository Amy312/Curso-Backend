import { IUserEntity } from '../../domain/entities/IUserEntity';
import { ICacheService } from '../../domain/interfaces/ICacheService';
import { RolRepository } from '../../domain/interfaces/rol.repository';
import { User } from '../../domain/models/User.model';
import logger from '../../infrastucture/logger/logger';
import { CreateUserDTO } from '../dtos/create.user.dto';
import { UpdateUserDTO } from '../dtos/update.user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserRepository } from './../../domain/interfaces/user.repository';

export class UserService {
    constructor(private userRepository: UserRepository, private rolRepository: RolRepository, private redisCacheService: ICacheService) { 
    }

    async getCache(userID: string) {
        const USER_KEY = "USER";

        const sol = await this.redisCacheService.get(`${USER_KEY}:${userID}`);
        console.log("🚀 ~ file: auth.service.ts:19 ~ AuthService ~ getCache ~ sol:", sol)
        return sol;
    }
    async getUserById(id: string): Promise<UserDto | null> {

        const userSaved = await this.getCache(id);
        console.log("🚀 ~ file: user.service.ts:25 ~ UserService ~ getUserById ~ userSaved:", userSaved)
        
        if(userSaved!=null){
            const userContent = JSON.parse(userSaved);

            return {
                id: userContent.id,
                username: userContent.username,
                email: userContent.email,
                lastLogin: userContent.lastLogin,
                token: userContent.token
            }
            
        } 
        logger.info("estoy dentro del UserById Service");
        logger.debug("esto es");
        const user = await this.userRepository.findById(id);
        // log.debug user

        if (!user){
            logger.error(`EL usuario con el id: ${id} no existe`);
            throw Error(`EL usuario con el id: ${id} no existe`);
        };

        const userResponse: UserDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin,
            token: user.token
        }
        this.redisCacheService.set(`USER:${user.id}`, JSON.stringify(user));
        // log.info user obtenido exitosamente
        return userResponse;
    }

    async createUser(userDto: CreateUserDTO): Promise<User> {
        // info 
        const role = await this.rolRepository.findById(userDto.roleId);
        if(!role){
            throw new Error('Rol no encontrado');
        }
        const userEntity: IUserEntity = {
            username: userDto.username,
            email: userDto.email,
            passwordHash: userDto.password,
            createdAt: new Date(),
            lastLogin: null,
            role
        };
        const newUser = new User(userEntity);
        return this.userRepository.createUser(newUser);
    }

    async updateUser(id: string, userDto: Partial<CreateUserDTO>): Promise<User> {
        // info 
        return this.userRepository.updateUser(id, userDto)
    }

    async deleteUser(id: string): Promise<void> {
         await this.userRepository.deleteUser(id);
        // info 
        
    }
}