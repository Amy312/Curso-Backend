import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cl6hugauuipc73cngn50-a.oregon-postgres.render.com",
    port: 5432,
    username: "root",
    password: "l5OJbQb5gXJaZde3i6w3V9wOMmVASwXj",
    database: "andersauriocomunitario",
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
});