const { DataTypes } = require('sequelize');
const  {sequelize } = require('../config/database');
const QuizzType = require('./quizzTypeModel')

const Evaluation = sequelize.define('Evaluation', {
  evaluation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  quizz_type: {
    type: DataTypes.INTEGER,
    references: {
      model: QuizzType,
      key: 'quizztype_id'
    },
    allowNull: true
  },
  name:{
    type: DataTypes.TEXT, 
  },
  module_id: {
    type: DataTypes.INTEGER,
  },
  is_complete:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  
}, {
  tableName: 'evaluations',
  timestamps: false, 
});



module.exports = Evaluation;
