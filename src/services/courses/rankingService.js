const EvaluationResult = require('../../models/evaluationResultModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');
const Evaluation = require('../../models/evaluationModel');
const Module = require('../../models/moduleModel');

const Course = require('../../models/courseModel');
const CampaignUser = require('../../models/campaignUser');
const CampaignCourse = require('../../models/campaignCourse');
const { sequelize } = require('../../config/database');
const Campaign = require('../../models/campaignModel');
//reutilizar para user_id con course_id y otro agregando prequizz con prequizzresult
const getAverageScoresByCourseAndUser = async (course_id) => {
  try {
    // Obtener todas las evaluaciones del curso
    const allEvaluations = await Evaluation.findAll({
      where: {
        '$Module.course_id$': course_id // Filtrar por el ID del curso dentro del módulo
      },
      include: [
        {
          model: Module,
          attributes: ['module_id', 'name'], // Incluir solo los atributos necesarios del módulo
          where: { course_id },
        },
      ],
      attributes: ['evaluation_id', 'name'],
      order: ['evaluation_id']
    });

    // Obtener los resultados de evaluación para el curso
    const results = await EvaluationResult.findAll({
      where: {
        '$Evaluation.Module.course_id$': course_id // Filtrar por el ID del curso dentro de la evaluación
      },
      include: [
        {
          model: Evaluation,
          attributes: ['evaluation_id', 'name'],
          include: [
            {
              model: Module,
              attributes: ['module_id', 'name'], // Incluir solo los atributos necesarios del módulo
              where: { course_id },
            },
          ],
        },
        {
          model: User,
          attributes: ['email', 'role_id'],
          include: [
            {
              model: Profile,
              attributes: ['first_name', 'last_name', 'profile_picture'],
            },
          ],
        },
      ],
      attributes: ['user_id', 'evaluation_id', 'total_score'],
      order: ['user_id']
    });


    // Group results by user_id
    const groupedResults = results.reduce((acc, result) => {
      if (!acc[result.user_id]) {
        acc[result.user_id] = {
          User: result.User,
          evaluations: [],
          total_score_sum: 0,
          average_score: 0
        };
      }

      acc[result.user_id].evaluations.push({
        user_id: result.user_id,
        evaluation_id: result.evaluation_id,
        total_score: result.total_score,
        Evaluation: result.Evaluation,
        realize_exam: true // Set to true by default
      });
      // Add total_score to total_score_sum
      acc[result.user_id].total_score_sum += parseInt(result.total_score);

      return acc;
    }, {});

    // Incluir evaluaciones que no están en los resultados
    allEvaluations.forEach(evaluation => {
      Object.keys(groupedResults).forEach(user_id => {
        const userResults = groupedResults[user_id].evaluations.map(e => e.evaluation_id);
        if (!userResults.includes(evaluation.evaluation_id)) {
          groupedResults[user_id].evaluations.push({
            user_id: parseInt(user_id),
            evaluation_id: evaluation.evaluation_id,
            total_score: 0, // Set total_score to 0 for unaudited evaluations
            Evaluation: evaluation,
            realize_exam: false // Set to false if no evaluation result exists
          });
        }
      });
    });

    // Calculate average_score for each user
    Object.keys(groupedResults).forEach(user_id => {
      const user = groupedResults[user_id];
      if (user.evaluations.length > 0) {
        user.average_score = user.total_score_sum / user.evaluations.length;
      }

      // Check if all evaluations are finalized
      const allExamsRealized = user.evaluations.every(evaluation => evaluation.realize_exam);
      user.is_finished = allExamsRealized; // Set esta_finalizado to true if all exams are realized

      // Set user status based on esta_finalizado and average_score
      if (user.is_finished) {
        user.status = user.average_score >= 12 ? 'Aprobado' : 'Desaprobado';
      } else {
        user.status = 'Pendiente';
      }
    });
    // Ordenar usuarios por average_score (de mayor a menor)
    const sortedResults = Object.values(groupedResults).sort((a, b) => b.average_score - a.average_score);

    return sortedResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getAverageScoresByCourseAndUser};
