// customModuleService.js
const Module = require('../../models/moduleModel'); // Asegúrate de que la ruta sea correcta

const customModuleService = {};

// Función para buscar módulos por curso id
customModuleService.getModulesByCourse = async (courseId) => {
  try {
    // Buscando los módulos relacionados con el curso
    const modules = await Module.findAll({
      where: {
        course_id: courseId,
      },
    });

    return modules;
  } catch (error) {
    throw new Error('Error al buscar módulos por curso');
  }
};

module.exports = customModuleService;
