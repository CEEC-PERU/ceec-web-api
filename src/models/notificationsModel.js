const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');

const Notification = sequelize.define('Notification', {
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        }
    },
    token : {
        type: DataTypes.STRING, 
        unique: true 
    },
}, {
    tableName: 'notifications',
    timestamps: false
});

module.exports = Notification;
