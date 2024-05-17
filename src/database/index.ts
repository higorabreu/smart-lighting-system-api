import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "smart_api",
    username: process.env.DB_USERNAME || "smart_api",
    password: process.env.DB_PASSWORD || "1234",
    define: {
        underscored: true
    }
});
