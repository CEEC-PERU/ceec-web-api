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


//promedio de cursos todos los cursos de la campaña por usuario.//corregigr
const getAverageScoresByCourseAndUser = async (campaign_id) => {
    try {
      const campaignCourses = await CampaignCourse.findAll({
        where: { campaign_id },
        include: [
          {
            model: Course,
            attributes: ['course_id', 'name'],
          },
        ],
      });
  
      const courseResults = await Promise.all(campaignCourses.map(async (campaignCourse) => {
        const courseId = campaignCourse.course_id;
        const courseName = campaignCourse.Course.name;
  
        const results = await EvaluationResult.findAll({
          where: {
            '$Evaluation.Module.course_id$': courseId,
          },
          include: [
            {
              model: Evaluation,
              attributes: ['evaluation_id', 'name'],
              include: [
                {
                  model: Module,
                  attributes: ['module_id', 'name'],
                  where: { course_id: courseId },
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
          order: ['user_id'],
        });
  
        const groupedResults = results.reduce((acc, result) => {
          const { user_id } = result;
          if (!acc[user_id]) {
            acc[user_id] = {
              User: result.User,
              Courses: [],
            };
          }
  
          const evaluationData = {
            evaluation_id: result.evaluation_id,
            total_score: result.total_score,
            Evaluation: result.Evaluation,
            realize_exam: true,
          };
  
          acc[user_id].Courses.push({
            course_id: courseId,
            name: courseName,
            evaluations: [evaluationData],
            total_score_sum: parseInt(result.total_score),
            average_score: parseInt(result.total_score),
            is_finished: true,
            status: parseInt(result.total_score) >= 12 ? 'Aprobado' : 'Desaprobado',
          });
  
          return acc;
        }, {});
  
        return groupedResults;
      }));
  
      const finalResults = {};
      courseResults.forEach((courseResult) => {
        Object.entries(courseResult).forEach(([userId, userData]) => {
          if (!finalResults[userId]) {
            finalResults[userId] = userData;
          } else {
            finalResults[userId].Courses.push(...userData.Courses);
          }
        });
      });
  
      return finalResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

module.exports = { getAverageScoresByCourseAndUser };
