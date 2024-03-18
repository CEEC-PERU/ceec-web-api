const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const User = require('./userModel');
const Course = require('./courseModel')
const CourseStudent = sequelize.define('CourseStudent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course, 
      key: 'course_id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'user_id',
    },
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
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
  tableName: 'coursestudent',
  timestamps: false,
});

module.exports = CourseStudent;
// Llama al método drop en el modelo CourseStudent para eliminar la tabla de la base de datos
/*CourseStudent.drop().then(() => console.log('CourseStudent table dropped'));*/