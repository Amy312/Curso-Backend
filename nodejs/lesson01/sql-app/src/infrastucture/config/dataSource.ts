import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { db } from "./config";
import { RolEntity } from "../entities/rol.entity";
import { PermissionEntity } from "../entities/permission.entity";

export const AppDataSource = new DataSource({
    type: db.type as "mysql" | "postgres",
    host: db.host,
    port: db.port as number,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: true,
    logging: false,
    entities: [UserEntity, RolEntity, PermissionEntity],
    subscribers: [],
    migrations: [],
});