import { IRolEntity } from '../entities/IRolEntity';
import { IUserEntity } from '../entities/IUserEntity';
import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string;
    username: string;
    passwordHash: string;
    email: string;
    createdAt: Date;
    lastLogin: Date | null;
    role: IRolEntity;

    constructor(userEntity: Partial<IUserEntity>) {
        this.id = userEntity.id || uuidv4();
        this.username = userEntity.username;
        this.email = userEntity.email;
        this.passwordHash = userEntity.passwordHash;
        this.createdAt = userEntity.createdAt || new Date();
        this.lastLogin = userEntity.lastLogin;
        this.role = userEntity.role;
    }

    public login(): string{
        return 'holiw';
    }

   
}
