const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

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
 
  limit_date: {
    type: DataTypes.DATEONLY,
  },
 
}, {
  tableName: 'campaigns',
  timestamps: false,
});



module.exports = Campaign;
