const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
//dicionarios , flashcard y evaluation 
const QuizzType = sequelize.define('QuizzType', {
  quizztype_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
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
  description: {
    type: DataTypes.TEXT, 
  },
}, {
  tableName: 'quizztypes',
  timestamps: false, 
});

module.exports = QuizzType;