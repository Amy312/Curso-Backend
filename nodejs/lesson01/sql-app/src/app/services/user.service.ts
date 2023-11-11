import { UserDto } from '../dtos/user.dto';
import { UserRepository } from './../../domain/interfaces/user.repository';

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUserById(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.findById(id);
        if (!user) return null;

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin
        };
    }
}