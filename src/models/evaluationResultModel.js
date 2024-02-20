const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evaluation = require('./evaluationModel')
const User = require('./userModel')
const EvaluationResult = sequelize.define('EvaluationResult', {
    result_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Evaluation,
            key: 'evaluation_id'
          } 
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
          } 
    },
    total_score: {
        type: DataTypes.DECIMAL,
    }
}, {
    tableName: 'evaluationresults',
    timestamps: false,
})

module.exports = EvaluationResult;