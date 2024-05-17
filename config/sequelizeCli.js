require('dotenv').config();

module.exports = {
  "production": {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
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
