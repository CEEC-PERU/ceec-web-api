const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel')

const PreQuizz = sequelize.define('PreQuizz', {
  prequizz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  image_url: {
    type: DataTypes.STRING, 
  },
  question: {
    type: DataTypes.TEXT, 
  },
  correct_answer:{
    type: DataTypes.TEXT, 
  },
  incorrect_answer:{
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Course, 
        key: 'course_id',
    },
  },

}, {
  tableName: 'prequizzes',
  timestamps: false,
});

module.exports = PreQuizz;
