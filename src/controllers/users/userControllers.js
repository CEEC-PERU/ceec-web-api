const userService = require('../../services/users/userService');

async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}


async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const result = await userService.updateUser(userId, userData);
    if (result[0] === 1) {
      res.json({ message: 'Usuario actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    if (result === 1) {
      res.json({ message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
}


async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
}


async function getCourseStudentsStatistics(req, res) {
  try {
    const courseStudents = await userService.getAllCourseStudentsWithDetails();
    const totalStudents = await userService.getStudentsQuantity();
    //const approvedStudents = courseStudents.filter(student => student.is_approved === true).length;
    const inProgressStudents = courseStudents.filter(student => parseFloat(student.progress) > 0 && parseFloat(student.progress) < 1).length;
    //const disapprovedStudents = courseStudents.filter(student => student.is_approved !== true).length;

    const usersWithDisapprovedCourses = courseStudents.reduce((acc, student) => {
      if (student.is_approved === false) {
        acc[student.user_id] = true;
      }
      return acc;
    }, {});
    
    const disapprovedStudents = Object.keys(usersWithDisapprovedCourses).length;
    const approvedPercentage = 10;//(approvedStudents * totalStudents) // 100;
    const inProgressPercentage = 80;//(inProgressStudents * totalStudents) ;
    const disapprovedPercentage = 10;//disapprovedStudents  ;
    res.json({
      totalStudents,
      approvedPercentage,
      inProgressPercentage,
      disapprovedPercentage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estadísticas de estudiantes de cursos.' });
  }
};



async function getUsersNotEnrolledInCourse(req, res) {
  try {
    const { course_id } = req.params;
    const studentsNotEnrolled = await userService.findUsersNotEnrolledInCourse(course_id);

    res.json(studentsNotEnrolled);
  } catch (error) {
    console.error('Error al obtener estudiantes no inscritos:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes no inscritos. Consulta los registros para más detalles.' });
  }
}

async function getAllStudents(req, res) {
  try {
    const students = await userService.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los estudiantes' });
  }
}

async function getByRoleIdAndClientId(req, res){
  const users = await userService.getByRoleIdAndClientId();
  res.json(users);
}


module.exports = { getByRoleIdAndClientId, createUser, getUserById, updateUser, deleteUser, getAllUsers, getCourseStudentsStatistics, getUsersNotEnrolledInCourse , getAllStudents };