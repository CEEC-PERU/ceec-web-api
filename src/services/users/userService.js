// userService.js
const Role = require('../../models/roleModel');
const Course = require('../../models/courseModel');
const CourseStudent = require('../../models/courseStudent');
const User = require('../../models/userModel');
const Profile = require('../../models/profileModel');
const bcrypt = require('bcrypt');
const Module = require('../../models/moduleModel');
const Client = require('../../models/ClientModel');

async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return User.create(userData);
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
}

async function createUserAdmin(data) {
  try {
    console.log(data); // Log the data object
    data.password = await bcrypt.hash(data.password, 10);
    data.role_id = 3; 
    return await User.create({
      email: data.email,
      password: data.password,
      role_id: data.role_id,
      client_id: data.client_id,
    
    });
  } catch (error) {
    console.error(error); // Log the error object
    throw new Error('Error al crear el usuario');
  }
}

async function getAllCourseStudentsWithDetails(course_id) {
  try {
    const result = await CourseStudent.findAll({
      attributes: ['progress', 'is_approved'],
      include: [
        {
          model: User,
          attributes: ['email', 'role_id', 'user_id'],
          include: [
            {
              model: Profile,
              attributes: ['first_name', 'last_name', 'phone', 'profile_picture'],
            },
          ],
        },
        {
          model: Course,
          attributes: ['name'],
          where: course_id ? { course_id } : {}
          ,
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
  return User.findAll({
    include: [{
      model: Profile,
      attributes: ['first_name', 'last_name', 'phone', 'profile_picture'],
    },
    {
      model: Role,
      attributes: ['description'],
    }],
    attributes: ['email','client_id', 'role_id', 'user_id'],

  });
}

async function getStudentsQuantity(client_id) {
  try {
    const studentQuantity = await User.count({
      where: {
        role_id: 1,
        client_id:client_id
      }
    });
    return studentQuantity;
  } catch (error) {
    console.error('Error al obtener la cantidad de estudiantes:', error);
    throw new Error('Error al obtener la cantidad de estudiantes. Detalles en la consola.');
  }
}

async function findUsersNotEnrolledInCourse(course_id) {
  try {
    const usersNotEnrolled = await User.findAll({
      attributes: ['user_id', 'email', 'role_id'],
      include: [
        {
          model: CourseStudent,
          attributes: ['course_id'],
          where: {
            course_id
          },
          required: false
        },
        {
          model: Profile,
          attributes: ['first_name', 'last_name', 'phone', 'profile_picture'],
        }
      ],
      where: {
        role_id: 1,
        '$CourseStudents.course_id$': null
      }
    });
    return usersNotEnrolled;
  } catch (error) {
    console.error(error);
    throw new Error('Error at get students not enrolled');
  }
}

async function getAllStudents() {
  return User.findAll({
    where: {
      role_id: 1
    },
    include: [{
      model: Profile,
      attributes: ['first_name', 'last_name', 'phone', 'profile_picture'],
    },
    {
      model: Role,
      attributes: ['description'],
    }],
    attributes: ['email', 'role_id', 'user_id'],
  });
}

async function getByRoleIdAndClientId() {
  return await User.findAll({
    attributes: ['user_id', 'email', 'client_id' , 'role_id'],
    where: {
      role_id: 3,
    },
    include: [
      {
        model: Client,
        as: 'client',
        attributes: ['client_id', 'name'],
      },
      {
        model: Profile,
        attributes: ['first_name', 'last_name', 'phone', 'profile_picture'],
      }
    ],
  });
}




module.exports = {
  createUserAdmin,
  getByRoleIdAndClientId,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  getAllCourseStudentsWithDetails,
  getStudentsQuantity,
  findUsersNotEnrolledInCourse,
  getAllStudents
};