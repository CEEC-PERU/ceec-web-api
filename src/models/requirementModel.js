const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const Campaign = require('./campaignModel');
const User = require('./userModel');
const Requirement = sequelize.define('Requirement', {
   id_requerimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
   },
   fecha: {
        type: DataTypes.DATEONLY,
   },
  campaign_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Campaign, 
        key: 'campaign_id',
    },
  },

  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: User, 
        key: 'user_id',
    },
  },
  course_name: {
    type: DataTypes.TEXT,
    collate: 'pg_catalog."default"',
  },
  n_modulos: {
    type: DataTypes.STRING(100),
    collate: 'pg_catalog."default"',
  },
  material:{
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
}, {
  tableName: 'requirements',
  timestamps: false,
});

module.exports = Requirement;
