import { createClient } from "redis";
import { redis } from "../config/config";
import { ICacheService } from "../../domain/interfaces/ICacheService";

export class RedisCacheService implements ICacheService{
    private client;
    
    constructor() {
        this.client = createClient({url: redis.url});
        this.client.connect();
    }
    async get(key: string): Promise<any> {
       return this.client.get(key);
    }
    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value)
    }


}