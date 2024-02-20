// userService.js
const Course = require('../../models/courseModel');
const CourseStudent = require('../../models/courseStudent');
const User = require('../../models/userModel');
const Profile = require('../../models/profileModel');
const bcrypt = require('bcrypt');
const Module = require('../../models/moduleModel');

async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return User.create(userData);
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
}


async function getAllCourseStudentsWithDetails() {
  try {
    const result = await CourseStudent.findAll({
      attributes: ['progress', 'is_approved'],
      include: [
        {
          model: User,
          attributes: ['email', 'role_id'],
          include: [
            {
              model: Profile,
              attributes: ['first_name', 'last_name', 'phone'],
            },
          ],
        },
        {
          model: Course,
          attributes: ['name'],
          include: [
            {
              model: Module, 
              attributes: ['name', 'is_active'], 
              as: 'modules',
            },
          ],
        },
      ],
    });
    return result;
  } catch (error) {
    console.error('Error al obtener los datos de los estudiantes de cursos:', error);
    throw new Error('Error al obtener los datos de los estudiantes de cursos. Detalles en la consola.');
  }
}


async function getUserById(userId) {
  return User.findByPk(userId);
}

async function updateUser(userId, userData) {
  return User.update(userData, { where: { user_id: userId } });
}

async function deleteUser(userId) {
  return User.destroy({ where: { user_id: userId } });
}

async function getAllUsers() {
  return User.findAll();
}

async function getStudentsQuantity() {
  try {
    const studentQuantity = User.findAll({
      where: {
        role_id: 1,
      }
    });
    return (await studentQuantity).length;
  } catch (error) {
    console.error('Error al obtener la cantidad de estudiantes:', error);
    throw new Error('Error al obtener la cantidad de estudiantes. Detalles en la consola.');
  }
}


module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  getAllCourseStudentsWithDetails,
  getStudentsQuantity
};