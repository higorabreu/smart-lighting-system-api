import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'smart_api',
    username: 'postgres',
    password: 'postgres',
    define: {
        underscored: true
    }
});