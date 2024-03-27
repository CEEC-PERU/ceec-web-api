const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Client = sequelize.define('Clients', {
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    collate: 'pg_catalog."default"',
  },
  
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = Client;

