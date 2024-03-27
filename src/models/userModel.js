const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const Role = require('./roleModel');
const Cliente = require('./ClientModel');
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
 },
  password: {
    type: DataTypes.STRING
  },
  client_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'client_id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'role_id',
    },
  },
  failed_login_attempts: {
    type: DataTypes.INTEGER,
  },
  last_failed_login: {
    type: DataTypes.DATE
  },
  is_blocked: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'users'
});

User.comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch
}



module.exports = User;
