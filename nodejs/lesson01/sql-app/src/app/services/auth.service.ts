import { IUserEntity } from '../../domain/entities/IUserEntity';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { User } from '../../domain/models/User.model';
import { jwt } from '../../infrastucture/config/config';
import logger from '../../infrastucture/logger/logger';
import { LoginDTO } from '../dtos/login.dto';
import { Encrypt } from './../utils/encrypt';

export class AuthService {
    constructor(private userRepository: UserRepository) { }

    async login(loginDto: LoginDTO): Promise<string> {
        // info 
  
        const userEntity: Partial<IUserEntity> = {
            email: loginDto.email,
            passwordHash: loginDto.password,

        };
        const user: User = await this.userRepository.findByEmail(userEntity.email);
        if(!user){
            logger.error(`EL usuario con el email: ${userEntity.email} no existe`);
            throw Error('El email o el password son incorrectos');
        }
        const token = this.
        return token;
    }

}