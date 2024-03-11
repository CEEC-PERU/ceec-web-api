const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel')
const Campaign = sequelize.define('Campaign', {
  campaign_id: {
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
  is_finish: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  limit_date: {
    type: DataTypes.DATEONLY,
  },
  image: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'campaigns',
  timestamps: false,
});



module.exports = Campaign;
