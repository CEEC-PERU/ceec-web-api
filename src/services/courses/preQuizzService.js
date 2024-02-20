const { sequelize } = require('../../config/database');
const PreQuizz = require('../../models/preQuizzModel');

exports.getAllPreQuizzes = async () => {
  try {
    return await PreQuizz.findAll();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener todos los prequizzes');
  }
};

exports.getPreQuizzById = async (preQuizzId) => {
  try {
    return await PreQuizz.findByPk(preQuizzId);
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el prequizz por ID');
  }
};

exports.createPreQuizz = async (preQuizzData) => {
  console.log(preQuizzData);
  try {
    return await PreQuizz.create(preQuizzData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el prequizz');
  }
};

exports.updatePreQuizz = async (preQuizzId, preQuizzData) => {
  try {
    const preQuizz = await PreQuizz.findByPk(preQuizzId);
    if (preQuizz) {
      await preQuizz.update(preQuizzData);
      return preQuizz;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el prequizz');
  }
};

exports.deletePreQuizz = async (preQuizzId) => {
  try {
    const preQuizz = await PreQuizz.findByPk(preQuizzId);
    if (preQuizz) {
      await preQuizz.destroy();
      return preQuizz;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el prequizz');
  }
};

exports.getPreQuizzesByCourseId = async (courseId) => {
  try {
    return await PreQuizz.findAll({
      where: {
        course_id: courseId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los prequizzes por course_id');
  }
};
