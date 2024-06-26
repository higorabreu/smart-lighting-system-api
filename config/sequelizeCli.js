import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  "production": {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    use_env_variable: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  "development": {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'smart_api',
    username: 'smart_api',
    password: '1234'
  }
};
