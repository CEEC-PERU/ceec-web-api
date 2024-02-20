const Quizz = require('../../models/quizzModel');

exports.getAllQuizzes = async () => {
  try{
    return await Quizz.findAll();
  }catch(error){
      console.error(error);
  }
};

exports.getQuizzById = async (quizzId) => {
  try{
    return await Quizz.findByPk(quizzId);
  }catch(error){
    console.error(error);
  }
};

exports.createQuizz = async (quizzData) => {
  try{
    return await Quizz.create(quizzData);
  }catch(error){
    console.error(error);
  }
};

exports.updateQuizz = async (quizzId, quizzData) => {
  try{
    const quizz = await Quizz.findByPk(quizzId);
    if (quizz) {
      await quizz.update(quizzData);
      return quizz;
    }
    return null;
  }catch(error){
    console.error(error);
  }
};

exports.deleteQuizz = async (quizzId) => {
  try{
    const quizz = await Quizz.findByPk(quizzId);
    if (quizz) {
      await quizz.destroy();
      return quizz;
    }
    return null;
  }catch(error){
    console.error(error);
  }
};



exports.getQuizzesByEvaluationId = async (evaluationId) => {
  try {
    return await Quizz.findAll({
      where: { evaluation_id: evaluationId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
