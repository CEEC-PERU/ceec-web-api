const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Quizz = sequelize.define('Quizz', {
  quizz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  evaluation_id: {
    type: DataTypes.INTEGER,
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
  points:{
    type: DataTypes.INTEGER,
  },
 //quizz_type:null
}, {
  tableName: 'quizzes',
  timestamps: false,
});

module.exports = Quizz;
