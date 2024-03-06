const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const PreQuizz = require('./preQuizzModel')
const User = require('./userModel')
const preQuizzResultModel = sequelize.define('preQuizzResultModel', {
    pre_result_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prequizz_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PreQuizz,
            key: 'prequizz_id'
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
    }
}, {
    tableName: 'prequizzresults',
    timestamps: false,
})


module.exports = preQuizzResultModel;