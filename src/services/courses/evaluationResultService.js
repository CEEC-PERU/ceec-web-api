const EvaluationResult  = require('../../models/evaluationResultModel'); 
const Profile= require('../../models/profileModel');
const User = require('../../models/userModel');
const Evaluation = require('../../models/evaluationModel'); 
const Module = require('../../models/moduleModel');
exports.getAllEvaluationResults = async () => {
  try {
    console.log('Before findAll');  // Add this line for debugging
    const results = await EvaluationResult.findAll();
    console.log('After findAll');  // Add this line for debugging
    return results;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener todos los resultados de evaluación');
  }
};

exports.getEvaluationResultById = async (resultId) => {
  try {
    return await EvaluationResult.findByPk(resultId);
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el resultado de evaluación por ID');
  }
};

exports.createEvaluationResult = async (evaluationResultData) => {
  try {
    return await EvaluationResult.create(evaluationResultData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el resultado de evaluación');
  }
};

exports.updateEvaluationResult = async (resultId, evaluationResultData) => {
  try {
    const result = await EvaluationResult.findByPk(resultId);
    if (result) {
      await result.update(evaluationResultData);
      return result;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el resultado de evaluación');
  }
};

exports.deleteEvaluationResult = async (resultId) => {
  try {
    const result = await EvaluationResult.findByPk(resultId);
    if (result) {
      await result.destroy();
      return result;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el resultado de evaluación');
  }
};

exports.getResultsByEvaluationId = async (evaluationId) => {
  try {
      const results = await EvaluationResult.findAll({
          where: {
              evaluation_id: evaluationId,
          },
          include: [
              {
                  model: User,
                  include: [
                      {
                          model: Profile,
                          attributes: ['first_name', 'last_name', 'profile_picture'],
                      },
                  ],
              },
          ],
          order: [
              ['total_score', 'DESC']
          ],
          limit: 3 
      });

      return results;
  } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los resultados de evaluación por evaluationId');
  }
};
exports.getResultsByUserIdAndEvaluationId = async (userId, evaluationId) => {
  try {
    return await EvaluationResult.findAll({
      where: {
        user_id: userId,
        evaluation_id: evaluationId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los resultados de evaluación por user_id y evaluation_id');
  }
};


exports.getResultsByCourseAndUser = async (course_id, user_id) => {
  try {
    const results = await EvaluationResult.findAll({
      where: { 
        user_id,
        '$Evaluation.Module.course_id$': course_id // Filtrar por el ID del curso dentro de la evaluación
      },
      include: [
        {
          model: Evaluation,
          attributes: ['name'],
          include: [
            {
              model: Module,
              attributes: ['name', 'course_id'],
              where: { course_id }, 
            },
          ],
        },
      ],
    });

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};  

