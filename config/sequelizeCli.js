require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'smart_api',
    username: process.env.DB_USERNAME || 'smart_api',
    password: process.env.DB_PASSWORD || '1234'
  }
};
