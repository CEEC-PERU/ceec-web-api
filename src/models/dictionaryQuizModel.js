const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const DictionaryQuiz = sequelize.define('DictionaryQuiz', {
    dictionary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    word: {
        type: DataTypes.TEXT,
    },
    meaning: {
        type: DataTypes.TEXT
    },
    module_id: {
        type: DataTypes.INTEGER
    },
    quizztype_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'dictionaryquizzes',
    timestamps: false,
});

module.exports = DictionaryQuiz;