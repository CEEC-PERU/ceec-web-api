const DictionaryQuiz = require('../../models/dictionaryModel');

exports.getAllDictionaryQuizzes = async () => {
  try {
    return await DictionaryQuiz.findAll();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener todos los quizzes del diccionario');
  }
};

exports.getDictionaryQuizById = async (quizId) => {
  try {
    return await DictionaryQuiz.findByPk(quizId);
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el quiz del diccionario por ID');
  }
};

exports.createDictionaryQuiz = async (quizData) => {
  try {
    return await DictionaryQuiz.create(quizData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el quiz del diccionario');
  }
};

exports.updateDictionaryQuiz = async (quizId, quizData) => {
  try {
    const quiz = await DictionaryQuiz.findByPk(quizId);
    if (quiz) {
      await quiz.update(quizData);
      return quiz;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el quiz del diccionario');
  }
};

exports.deleteDictionaryQuiz = async (quizId) => {
  try {
    const quiz = await DictionaryQuiz.findByPk(quizId);
    if (quiz) {
      await quiz.destroy();
      return quiz;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el quiz del diccionario');
  }
};

exports.getDictionaryQuizzesByModuleId = async (moduleId) => {
  try {
    return await DictionaryQuiz.findAll({
      where: {
        module_id: moduleId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los quizzes del diccionario por module_id');
  }
};
