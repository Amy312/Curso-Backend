import { User } from "../models/User.model";

export interface UserRepository{
    findById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: string, user: User): Promise<User | null>;
    deleteUser(id: string): Promise<User | null>;
}