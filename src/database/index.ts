import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
        ssl: {
          require: true
        }
      },
      define: {
        underscored: true
      },
      logging: false
 })
