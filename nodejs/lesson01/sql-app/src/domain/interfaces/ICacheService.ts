import { UserDto } from "../../app/dtos/user.dto";

export interface ICacheService {
    get(key: string): Promise<any | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
}