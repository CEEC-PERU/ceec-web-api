const userService = require('../../services/users/userService');
const ranking = require('../../services/campaign/RankingClientService');
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



async function createUserAdmin(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUserAdmin(userData);
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
    const { client_id } = req.params; 
   /* const courseStudents = await userService.getAllCourseStudentsWithDetails();*/
    const totalStudents = await userService.getStudentsQuantity(client_id);
    const info = await ranking.getAverageScoresByClient(client_id);
    // Inicializamos los contadores de estudiantes
    let approvedStudents = 0;
    let inProgressStudents = 0;
    let disapprovedStudents = 0;
    
    // Iteramos sobre cada estudiante
    info.forEach(student => {
      // Inicializamos contadores para los estados de los cursos
      let approvedCount = 0;
      let inProgressCount = 0;
      let disapprovedCount = 0;
    
      // Iteramos sobre cada campaña del estudiante
      student.Campaigns.forEach(campaign => {
        // Iteramos sobre cada curso de la campaña
        campaign.Courses.forEach(course => {
          // Comprobamos el estado del curso y ajustamos los contadores
          if (course.status === "Aprobado") {
            approvedCount++;
          } else if (course.status === "Pendiente") {
            inProgressCount++;
          } else if (course.status === "Desaprobado") {
            disapprovedCount++;
          }
        });
      });
    
      // Determinamos el estado predominante del estudiante
      if (approvedCount >= inProgressCount && approvedCount >= disapprovedCount) {
        approvedStudents++;
      } else if (inProgressCount >= approvedCount && inProgressCount >= disapprovedCount) {
        inProgressStudents++;
      } else {
        disapprovedStudents++;
      }
    });
    // Calcular los porcentajes
  // Calcular los porcentajes y redondear a dos decimales
const approvedPercentage = ((approvedStudents / totalStudents) * 100).toFixed(2);
const inProgressPercentage = ((inProgressStudents / totalStudents) * 100).toFixed(2);
const disapprovedPercentage = ((disapprovedStudents / totalStudents) * 100).toFixed(2);
    /*
    const disapprovedStudents = Object.keys(usersWithDisapprovedCourses).length;
    const approvedPercentage = 10;//(approvedStudents * totalStudents) // 100;
    const inProgressPercentage = 80;//(inProgressStudents * totalStudents) ;
    const disapprovedPercentage = 10;//disapprovedStudents  ;*/
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

module.exports = {createUserAdmin, getByRoleIdAndClientId, createUser, getUserById, updateUser, deleteUser, getAllUsers, getCourseStudentsStatistics, getUsersNotEnrolledInCourse , getAllStudents };