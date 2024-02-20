const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: DataTypes.STRING,

  description: DataTypes.STRING,

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

module.exports = Role;