
const Module = require('../../models/moduleModel');
const Course = require('../../models/courseModel'); 

const customModuleController = {};

// Función para buscar módulos por curso
customModuleController.getModulesByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId; // ID del curso desde los parámetros de la solicitud
    // Busca el curso por su ID 
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    // Busca los módulos relacionados con el curso
    const modules = await Module.findAll({
      where: {
        course_id: courseId,
      },
    });
    res.json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar módulos por curso' });
  }
};

module.exports = customModuleController;
