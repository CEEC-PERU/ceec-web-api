// Importación de modelos necesarios
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


// Definición de la función asincrónica que obtiene los promedios de puntajes por usuario y curso
const getAllCampaignQuiz = async ( client_id ) => {
  try {
    // Obtener los IDs de usuario asociados con la campaña
    const campaignUsers = await CampaignUser.findAll({
      attributes: ['user_id'],
      include: [
        {
          model: User,
          attributes: ['client_id' ],
          where: { client_id: client_id },
          
        },
        {
            model: Campaign,
            attributes: ['client_id' ],
            where: { client_id: client_id },
            
          },
      ]
    });

  // Obtener la información de la campaña
  const campaign = await Campaign.findOne({
    attributes: ['name'],
  });

 
    // Obtener los cursos asociados a la campaña
    const campaignCourses = await CampaignCourse.findAll({
      attributes: ['course_id'],
      
    });
    // Obtener todas las evaluaciones del curso
    const allEvaluations = await Evaluation.findAll({
      where: { '$Module.course_id$': campaignCourses.map(course => course.course_id) },
     
      include: [
        {
          model: Module,
          attributes: ['module_id', 'name' ,'course_id' ],
          where: { course_id: campaignCourses.map(course => course.course_id) },
          /*include: [
            {
              model: Course,
              as: 'course',
              attributes: ['course_id', 'name'],
            },
          ],*/
        },
      ],
      attributes: ['evaluation_id', 'name'],
      order: ['evaluation_id'],
    });
console.log(allEvaluations)
    // Obtener los resultados de evaluación para los usuarios de la campaña
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

    // Fetch all prequizzes for the courses in the campaign
const allPrequizzes = await Prequizz.findAll({
  where: { course_id: campaignCourses.map(course => course.course_id) },
});


    // Fetch PrequizzResult data for the users in the campaign and the courses in the campaign
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


// Obtener los nombres de los cursos por courseId
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
    // Agrupar los resultados por usuario y curso
    const groupedResults = results.reduce((acc, result) => {
      const { user_id } = result;
      const courseId = result.Evaluation.Module.course_id;

      if (!acc[user_id]) {
        acc[user_id] = {
          User: result.User,
          Courses: {},
        };
      }

      if (courseId && !acc[user_id].Courses[courseId]) {
       
        acc[user_id].Courses[courseId] = {
          name:  courseNames[courseId], 
          evaluations: [],
          total_score_sum: 0,
          average_score: 0,
          is_finished: true,
          status: 'Pendiente',
        };
      }

      const evaluationData = {
        evaluation_id: result.evaluation_id,
        total_score: result.total_score,
        Evaluation: result.Evaluation,
        realize_exam: true, // Suponiendo que todas las evaluaciones están realizadas por defecto
      };

      if (courseId) {
        acc[user_id].Courses[courseId].evaluations.push(evaluationData);
        acc[user_id].Courses[courseId].total_score_sum += parseInt(result.total_score);
      }

      return acc;
    }, {});

     // Agregar el nombre de la campaña a los resultados
     Object.values(groupedResults).forEach(userResults => {
      userResults.campaign_name = campaign.name;
    });

   // Incluir los PrequizzResult en el objeto de grupo de resultados
prequizzResults.forEach(result => {
  const { user_id, course_id, puntaje, efectividad } = result;
  if (!groupedResults[user_id]) {
    groupedResults[user_id] = {
      User: result.User,
      Courses: {},
    };
  }
  if (!groupedResults[user_id].Courses[course_id]) {
    groupedResults[user_id].Courses[course_id] = {
      name: result.Course.name,
      evaluations: [],
      total_score_sum: 0,
      average_score: 0,
      is_finished: true,
      status: 'Pendiente',
    };
  }
  groupedResults[user_id].Courses[course_id].prequizz = {
    puntaje,
    efectividad,
    status: 'Completo',
  };
});

// Agregar prequizzes faltantes con puntaje 0 y estado 'No Completo'
campaignCourses.forEach(campaignCourse => {
  const courseId = campaignCourse.course_id;
  const userIds = Object.keys(groupedResults);
  
  userIds.forEach(userId => {
    if (!groupedResults[userId].Courses[courseId]) {
      groupedResults[userId].Courses[courseId] = {
        name: '',
        evaluations: [],
        total_score_sum: 0,
        average_score: 0,
        is_finished: true,
        status: 'Pendiente',
      };
    }
    
    const prequizzes = allPrequizzes.filter(prequizz => prequizz.course_id === courseId);
    prequizzes.forEach(prequizz => {
      const existingPrequizz = groupedResults[userId].Courses[courseId].prequizz;
      if (!existingPrequizz) {
        groupedResults[userId].Courses[courseId].prequizz = {
          puntaje: 0,
          efectividad: 0,
          status: 'No Completo',
        };
      }
    });
  });
});
  

 // Agregar evaluaciones faltantes con total_score 0
 campaignCourses.forEach(campaignCourse => {
  const courseId = campaignCourse.course_id;
  const userIds = Object.keys(groupedResults);
  
  userIds.forEach(userId => {
    if (!groupedResults[userId].Courses[courseId]) {
      groupedResults[userId].Courses[courseId] = {
        name: '',
        evaluations: [],
        total_score_sum: 0,
        average_score: 0,
        is_finished: true,
        status: 'Pendiente',
      };
    }
    
    const evaluations = allEvaluations.filter(evaluation => evaluation.Module.course_id === courseId);
    evaluations.forEach(evaluation => {
      const existingEvaluation = groupedResults[userId].Courses[courseId].evaluations.find(ev => ev.evaluation_id === evaluation.evaluation_id);
      if (!existingEvaluation) {
        groupedResults[userId].Courses[courseId].evaluations.push({
          user_id: userId,
          evaluation_id: evaluation.evaluation_id,
          total_score: 0,
          Evaluation: {
            evaluation_id: evaluation.evaluation_id,
            name: evaluation.name,
            Module: {
              name: evaluation.Module.name,
              course_id: evaluation.Module.course_id
            }
          },
          realize_exam: false
        });
      }
    });
  });
});

    // Calcular el promedio de puntajes y el estado para cada usuario y curso
    Object.values(groupedResults).forEach(userResults => {
      Object.values(userResults.Courses).forEach(course => {
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

    // Calcular el promedio de los average_score por usuario
Object.values(groupedResults).forEach(userResults => {
  let totalAverageScore = 0;
  let numCoursesWithScores = 0;

  Object.values(userResults.Courses).forEach(course => {
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



