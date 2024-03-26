// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME || 'ceeclocal', process.env.DB_USER || 'postgres' , process.env.DB_PASSWORD || '12345', {
  host: process.env.DB_HOST || 'localhost'  , 
  //Con Render comentar el port , con railway no.
  //port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
});

module.exports = { sequelize };


