import { User } from "../models/User.model";

export interface UserRepository{
    findById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: string, user: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User |null>;
}