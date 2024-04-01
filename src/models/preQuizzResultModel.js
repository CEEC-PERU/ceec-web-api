const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel')
const Curso = require('./courseModel')
const preQuizzResultModel = sequelize.define('preQuizzResultModel', {
    pre_result_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Curso,
            key: 'course_id'
          } 
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
          } 
    },
    puntaje : {
        type: DataTypes.DECIMAL,
    },
    efectividad : {
        type: DataTypes.DECIMAL,
    },
   
}, {
    tableName: 'prequizzresults',
    timestamps: false,
})
    
module.exports = preQuizzResultModel;