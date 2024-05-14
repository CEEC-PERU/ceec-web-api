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
const getAverageScoresByCampaignQuiz = async (campaign_id, client_id) => {
    try {
      const campaignUsers = await CampaignUser.findAll({
        where: { campaign_id },
        attributes: ['user_id'],
        include: [
          {
            model: User,
            attributes: ['client_id'],
            where: { client_id: client_id },
          },
        ],
      });
  
      const campaign = await Campaign.findOne({
        where: { campaign_id },
        attributes: ['name'],
      });
  
      const campaignCourses = await CampaignCourse.findAll({
        where: { campaign_id },
        attributes: ['course_id'],
      });
  
      const allEvaluations = await Evaluation.findAll({
        where: { '$Module.course_id$': campaignCourses.map(course => course.course_id) },
        include: [
          {
            model: Module,
            attributes: ['module_id', 'name', 'course_id'],
            where: { course_id: campaignCourses.map(course => course.course_id) },
          },
        ],
        attributes: ['evaluation_id', 'name'],
        order: ['evaluation_id'],
      });
  
      const results = await EvaluationResult.findAll({
        where: {
          user_id: campaignUsers.map(user => user.user_id),
          '$Evaluation.Module.course_id$': campaignCourses.map(course => course.course_id),
        },
        include: [
          {
            model: Evaluation,
            attributes: ['evaluation_id', 'name'],
            include: [
              {
                model: Module,
                attributes: ['module_id', 'name', 'course_id'],
                where: { course_id: campaignCourses.map(course => course.course_id) },
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
  
      const allPrequizzes = await Prequizz.findAll({
        where: { course_id: campaignCourses.map(course => course.course_id) },
      });
  
      const prequizzResults = await PrequizzResult.findAll({
        where: {
          user_id: campaignUsers.map(user => user.user_id),
          course_id: campaignCourses.map(course => course.course_id),
        },
        include: [
          {
            model: Course,
            attributes: ['course_id', 'name'],
          },
        ],
      });
  
      const courseNames = {};
      await Promise.all(
        campaignCourses.map(async (course) => {
          const courseDetails = await Course.findOne({
            where: { course_id: course.course_id },
            attributes: ['name'],
          });
          courseNames[course.course_id] = courseDetails ? courseDetails.name : '';
        })
      );
  
      const groupedResults = results.reduce((acc, result) => {
        const { user_id } = result;
        const courseId = result.Evaluation.Module.course_id;
  
        if (!acc[user_id]) {
          acc[user_id] = {
            User: result.User,
            Courses: [],
          };
        }
  
        if (courseId && !acc[user_id].Courses.some(course => course.course_id === courseId)) {
          acc[user_id].Courses.push({
            course_id: courseId,
            name: courseNames[courseId],
            evaluations: [],
            total_score_sum: 0,
            average_score: 0,
            is_finished: true,
            status: 'Pendiente',
          });
        }
  
        const course = acc[user_id].Courses.find(course => course.course_id === courseId);
  
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
  
        return acc;
      }, {});
  
      Object.values(groupedResults).forEach(userResults => {
        userResults.campaign_name = campaign.name;
      });
  
      prequizzResults.forEach(result => {
        const { user_id, course_id, puntaje, efectividad } = result;
        const course = groupedResults[user_id].Courses.find(course => course.course_id === course_id);
        if (course) {
          course.prequizz = {
            puntaje,
            efectividad,
            status: 'Completo',
          };
        } else {
          groupedResults[user_id].Courses.push({
            course_id: course_id,
            name: result.Course.name,
            evaluations: [],
            total_score_sum: 0,
            average_score: 0,
            is_finished: true,
            status: 'Pendiente',
            prequizz: {
              puntaje,
              efectividad,
              status: 'Completo',
            },
          });
        }
      });
  
      campaignCourses.forEach(campaignCourse => {
        const courseId = campaignCourse.course_id;
        const userIds = Object.keys(groupedResults);
  
        userIds.forEach(userId => {
          if (!groupedResults[userId].Courses.some(course => course.course_id === courseId)) {
            groupedResults[userId].Courses.push({
              course_id: courseId,
              name: '',
              evaluations: [],
              total_score_sum: 0,
              average_score: 0,
              is_finished: true,
              status: 'Pendiente',
            });
          }
  
          const prequizzes = allPrequizzes.filter(prequizz => prequizz.course_id === courseId);
          prequizzes.forEach(prequizz => {
            const course = groupedResults[userId].Courses.find(course => course.course_id === courseId);
            if (!course.prequizz) {
              course.prequizz = {
                puntaje: 0,
                efectividad: 0,
                status: 'No Completo',
              };
            }
          });
        });
      });
  
      campaignCourses.forEach(campaignCourse => {
        const courseId = campaignCourse.course_id;
        const userIds = Object.keys(groupedResults);
  
        userIds.forEach(userId => {
          const course = groupedResults[userId].Courses.find(course => course.course_id === courseId);
  
          const evaluations = allEvaluations.filter(evaluation => evaluation.Module.course_id === courseId);
          evaluations.forEach(evaluation => {
            const existingEvaluation = course.evaluations.find(ev => ev.evaluation_id === evaluation.evaluation_id);
            if (!existingEvaluation) {
              course.evaluations.push({
                user_id: userId,
                evaluation_id: evaluation.evaluation_id,
                total_score: 0,
                Evaluation: {
                  evaluation_id: evaluation.evaluation_id,
                  name: evaluation.name,
                  Module: {
                    name: evaluation.Module.name,
                    course_id: evaluation.Module.course_id,
                  },
                },
                realize_exam: false,
              });
            }
          });
        });
      });
  
      Object.values(groupedResults).forEach(userResults => {
        userResults.Courses.forEach(course => {
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
      });
  
      Object.values(groupedResults).forEach(userResults => {
        let totalAverageScore = 0;
        let numCoursesWithScores = 0;
  
        userResults.Courses.forEach(course => {
          if (course.average_score !== undefined && !isNaN(course.average_score)) {
            totalAverageScore += course.average_score;
            numCoursesWithScores++;
          }
        });
  
        if (numCoursesWithScores > 0) {
          userResults.average_courses = totalAverageScore / numCoursesWithScores;
        } else {
          userResults.average_courses = 0;
        }
      });
  
      const sortedResults = Object.values(groupedResults).sort((a, b) => b.average_courses - a.average_courses);
  
      return sortedResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  module.exports = { getAverageScoresByCampaignQuiz };
  