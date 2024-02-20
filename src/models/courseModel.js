const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('Course', {
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    collate: 'pg_catalog."default"',
  },
  description: {
    type: DataTypes.TEXT,
    collate: 'pg_catalog."default"',
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
  is_finish: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  limit_date: {
    type: DataTypes.DATEONLY,
  },
  image: {
    type: DataTypes.TEXT,
  }
}, {
  tableName: 'courses',
  timestamps: false,
});

module.exports = Course;
