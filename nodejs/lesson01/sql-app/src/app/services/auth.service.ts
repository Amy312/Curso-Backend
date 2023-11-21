import { IUserEntity } from '../../domain/entities/IUserEntity';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { User } from '../../domain/models/User.model';
import { jwt } from '../../infrastucture/config/config';
import logger from '../../infrastucture/logger/logger';
import { LoginDTO } from '../dtos/login.dto';
import { Encrypt } from './../utils/encrypt';
import { UserDto } from '../dtos/user.dto';
import bcrypt from "bcrypt";
import { RedisCacheService } from '../../infrastucture/cache/redis.cache';
import { ICacheService } from '../../domain/interfaces/ICacheService';

export class AuthService {
    constructor(private userRepository: UserRepository, private encrypt: Encrypt) { 
    }
    
    async login(loginDto: LoginDTO): Promise<UserDto> {

        const userEntity: Partial<IUserEntity> = {
            email: loginDto.email,
            passwordHash: loginDto.password,

        };
        const user: User = await this.userRepository.findByEmail(userEntity.email);
        const USER_KEY = 'USER';
       // this.redisCacheService.set(`${USER_KEY}:${user.id}`, JSON.stringify(user));
        if(!user){
            logger.error(`EL usuario con el email: ${userEntity.email} no existe`);
            throw Error('El email o el password son incorrectos');
        }
        
        const isPasswordCorrect = await bcrypt.compare(userEntity.passwordHash, user.passwordHash);
        if (!isPasswordCorrect) {
            logger.error(`La contraseña es incorrecta : ${userEntity.email}`);
            throw Error('El email o el password son incorrectos');
        }

        const token = this.encrypt.encrypt({ userId: user.id });
        user.token = token;
        user.lastLogin = new Date();

        const userUpdated = await this.userRepository.updateUser(user.id, user);

        return {
            id: userUpdated.id,
            username: userUpdated.username,
            email: userUpdated.email,
            lastLogin: userUpdated.lastLogin,
            token: user.token
        };
    }

}