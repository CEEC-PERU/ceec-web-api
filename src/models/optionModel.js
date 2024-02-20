const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Quizz = require('./quizzModel');

const Option = sequelize.define('Option', {
    option_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quizz_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Quizz, 
            key: 'quizz_id',
        },
    },
    option_text: DataTypes.STRING,
    explanation: DataTypes.STRING,
    is_correct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'options',
    timestamps: false,
});

module.exports = Option;