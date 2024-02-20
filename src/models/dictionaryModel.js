const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Module = require('./moduleModel')
const QuizzType = require('./quizzTypeModel')

const Dictionary = sequelize.define('DictionaryQuiz', {
  dictionary_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  word: {
    type: DataTypes.STRING,
  },
  correct_answer: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  incorrect_answer: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Module,
      key: 'module_id',
    },
  },
  quizztype_id: {
    type: DataTypes.INTEGER,
    references: {
      model: QuizzType,
      key: 'quizztype_id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, 
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'dictionaryquizzes',
  timestamps: false,
});


module.exports = Dictionary;
