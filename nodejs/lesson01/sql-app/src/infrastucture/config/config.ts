import dotenv from "dotenv";
dotenv.config();

export const env = {
    envPort: process.env.ENV_PORT || 3000,
};

export const db = {
    envPort: process.env.DB_PORT || 3306,
};