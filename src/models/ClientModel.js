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
  description: {
    type: DataTypes.TEXT,
    collate: 'pg_catalog."default"',
  },
  image: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = Client;

