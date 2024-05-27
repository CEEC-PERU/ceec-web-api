// Importar los modelos necesarios y la instancia de sequelize
const EvaluationResult = require('../../models/evaluationResultModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');
const Evaluation = require('../../models/evaluationModel');
const Module = require('../../models/moduleModel');
const Course = require('../../models/courseModel');
const PrequizzResult = require('../../models/preQuizzResultModel');
const Prequizz = require('../../models/preQuizzModel');
const CampaignUser = require('../../models/campaignUser');
const CampaignCourse = require('../../models/campaignCourse');
const { sequelize } = require('../../config/database');
const Campaign = require('../../models/campaignModel');
const Client = require('../../models/ClientModel');


const getAverageScoresByClient = async (client_id) => {
    try {
        // Recuperar todos los usuarios de campañas asociados con el cliente dado
        const campaignUsers = await CampaignUser.findAll({
          include: [
            {
              model: User,
              attributes: ['client_id'],
              where: { client_id }, // Filtrar por client_id
            },
          ],
          attributes: ['user_id', 'campaign_id'],
        });
    
        // Recuperar todas las campañas en las que participan estos usuarios
        const campaigns = await Campaign.findAll({
          where: { campaign_id: campaignUsers.map(cu => cu.campaign_id) }, // Filtrar por campaign_id
          attributes: ['campaign_id', 'name'],
        });
    
        // Recuperar todos los cursos de campañas relacionados con estas campañas
        const campaignCourses = await CampaignCourse.findAll({
          where: { campaign_id: campaigns.map(c => c.campaign_id) }, // Filtrar por campaign_id
          attributes: ['course_id', 'campaign_id'],
        });
    
        // Recuperar todas las evaluaciones asociadas con los cursos de las campañas
        const allEvaluations = await Evaluation.findAll({
          where: { '$Module.course_id$': campaignCourses.map(cc => cc.course_id) }, // Filtrar por course_id
          include: [
            {
              model: Module,
              attributes: ['module_id', 'name', 'course_id'],
              where: { course_id: campaignCourses.map(cc => cc.course_id) }, // Filtrar por course_id
            },
          ],
          attributes: ['evaluation_id', 'name'],
          order: ['evaluation_id'],
        });
    
        // Recuperar todos los resultados de evaluaciones para estos usuarios y cursos
        const results = await EvaluationResult.findAll({
          where: {
            user_id: campaignUsers.map(cu => cu.user_id), // Filtrar por user_id
            '$Evaluation.Module.course_id$': campaignCourses.map(cc => cc.course_id), // Filtrar por course_id
          },
          include: [
            {
              model: Evaluation,
              attributes: ['evaluation_id', 'name'],
              include: [
                {
                  model: Module,
                  attributes: ['module_id', 'name', 'course_id'],
                  where: { course_id: campaignCourses.map(cc => cc.course_id) }, // Filtrar por course_id
                  include: [
                    {
                      model: Course,
                      as: 'course',
                      attributes: ['course_id', 'name'],
                    },
                  ],
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
          order: ['user_id'],
        });
    
        // Recuperar todos los prequizzes relacionados con los cursos de las campañas
        const allPrequizzes = await Prequizz.findAll({
          where: { course_id: campaignCourses.map(cc => cc.course_id) }, // Filtrar por course_id
        });
    
        // Recuperar todos los resultados de prequizz para estos usuarios y cursos
        const prequizzResults = await PrequizzResult.findAll({
          where: {
            user_id: campaignUsers.map(cu => cu.user_id), // Filtrar por user_id
            course_id: campaignCourses.map(cc => cc.course_id), // Filtrar por course_id
          },
          include: [
            {
              model: Course,
              attributes: ['course_id', 'name'],
            },
          ],
        });
    
        // Crear un mapeo de nombres de cursos para referencia rápida
        const courseNames = {};
        await Promise.all(
          campaignCourses.map(async (cc) => {
            const courseDetails = await Course.findOne({
              where: { course_id: cc.course_id }, // Filtrar por course_id
              attributes: ['name'],
            });
            courseNames[cc.course_id] = courseDetails ? courseDetails.name : '';
          })
        );
    
      // Agrupar los resultados de evaluación por usuario, campaña y curso
const groupedResults = results.reduce((acc, result) => {
  const { user_id } = result;
  const courseId = result.Evaluation.Module.course_id;
  
  // Filtrar las campañas asociadas al usuario
  const userCampaigns = campaigns.filter(campaign => campaignUsers.find(cu => cu.user_id === user_id && cu.campaign_id === campaign.campaign_id));

  // Iterar sobre las campañas asociadas al usuario
  userCampaigns.forEach(campaign => {
      const campaignId = campaign.campaign_id;

      if (!acc[user_id]) {
          acc[user_id] = {
              User: result.User,
              Campaigns: {},
          };
      }

      if (!acc[user_id].Campaigns[campaignId]) {
          acc[user_id].Campaigns[campaignId] = {
              campaign_name: campaign.name,
              Courses: [],
          };
      }

      if (courseId && !acc[user_id].Campaigns[campaignId].Courses.some(course => course.course_id === courseId)) {
          acc[user_id].Campaigns[campaignId].Courses.push({
              course_id: courseId,
              name: courseNames[courseId],
              evaluations: [],
              total_score_sum: 0,
              average_score: 0,
              is_finished: true,
              status: 'Pendiente',
          });
      }

      const course = acc[user_id].Campaigns[campaignId].Courses.find(course => course.course_id === courseId);

      const evaluationData = {
          evaluation_id: result.evaluation_id,
          total_score: result.total_score,
          Evaluation: result.Evaluation,
          realize_exam: true,
      };

      if (courseId) {
          course.evaluations.push(evaluationData);
          course.total_score_sum += parseInt(result.total_score);
      }
  });

  return acc;
}, {});

        // Incluir evaluaciones que no están en los resultados
        allEvaluations.forEach(evaluation => {
          Object.keys(groupedResults).forEach(user_id => {
            Object.values(groupedResults[user_id].Campaigns).forEach(campaign => {
              campaign.Courses.forEach(course => {
                if (course.course_id === evaluation.Module.course_id && !course.evaluations.some(e => e.evaluation_id === evaluation.evaluation_id)) {
                  course.evaluations.push({
                    user_id: parseInt(user_id),
                    evaluation_id: evaluation.evaluation_id,
                    total_score: 0, // Set total_score to 0 for unaudited evaluations
                    Evaluation: evaluation,
                    realize_exam: false // Set to false if no evaluation result exists
                  });
                }
              });
            });
          });
        });
    
        // Recorrer los resultados agrupados y verificar si existe un resultado de prequizz para cada usuario
        Object.keys(groupedResults).forEach(user_id => {
          Object.values(groupedResults[user_id].Campaigns).forEach(campaign => {
            campaign.Courses.forEach(course => {
              const prequizzResult = prequizzResults.find(result => result.user_id.toString() === user_id && result.course_id === course.course_id);
              if (!prequizzResult) {
                // Si no hay resultado de prequizz, agregar uno con puntaje y efectividad de 0 y status "No completado"
                course.prequizzResults = [{
                  course_id: course.course_id,
                  puntaje: 0,
                  efectividad: 0,
                  status: 'No completado'
                }];
              } else {
                // Si hay resultado de prequizz, agregarlo al usuario
                course.prequizzResults = [{
                  course_id: prequizzResult.course_id,
                  puntaje: prequizzResult.puntaje,
                  efectividad: prequizzResult.efectividad,
                  status: 'Completado'
                }];
              }
            });
          });
        });
    



        // Calcular los promedios y estados para cada curso y campaña
        Object.values(groupedResults).forEach(userResults => {
          Object.values(userResults.Campaigns).forEach(campaignResults => {
            campaignResults.Courses.forEach(course => {
              const numEvaluations = course.evaluations.length;
              if (numEvaluations > 0) {
                course.average_score = course.total_score_sum / numEvaluations;
              }
              const allExamsRealized = course.evaluations.every(evaluation => evaluation.realize_exam);
              course.is_finished = allExamsRealized;
              if (course.is_finished) {
                course.status = course.average_score >= 12 ? 'Aprobado' : 'Desaprobado';
              }
            });
    
            let totalAverageScore = 0;
            let numCoursesWithScores = 0;
    
            campaignResults.Courses.forEach(course => {
              if (course.average_score !== undefined && !isNaN(course.average_score)) {
                totalAverageScore += course.average_score;
                numCoursesWithScores++;
              }
            });
    
            if (numCoursesWithScores > 0) {
              campaignResults.average_courses = totalAverageScore / numCoursesWithScores;
            } else {
              campaignResults.average_courses = 0;
            }
          });
        });
    
        // Ordenar las campañas por sus promedios
        const sortedResults = Object.values(groupedResults).map(user => {
          const sortedCampaigns = Object.values(user.Campaigns).sort((a, b) => b.average_courses - a.average_courses);
          user.Campaigns = sortedCampaigns;
          return user;
        });
    
        return sortedResults; // Devolver los resultados ordenados
      } catch (error) {
        console.error(error);
        throw error; // Manejo de errores
      }
    };
    
module.exports = { getAverageScoresByClient }; // Exportar la función



