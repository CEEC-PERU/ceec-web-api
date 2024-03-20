const EvaluationResult  = require('../../models/evaluationResultModel'); 
const Profile= require('../../models/profileModel');
const User = require('../../models/userModel');
const Evaluation = require('../../models/evaluationModel'); 
const Module = require('../../models/moduleModel');
const Course = require('../../models/courseModel');
const CampaignUser = require('../../models/campaignUser');
const CampaignCourse = require('../../models/campaignCourse');
const { sequelize } = require('../../config/database');
const Campaign = require('../../models/campaignModel');
exports.getRankingCourseEvaluation = async ( course_id) => {
    try {
      const coursesWithEvaluations = await CampaignCourse.findAll({
            include: [
              {
                model: Course,
                where: { course_id },
                include: [
                  {
                    model: Evaluation,
                    include: [
                      {
                        model: EvaluationResult,
                        required: false,
                        attributes: [
                          'total_score',
                          [sequelize.fn('AVG', sequelize.col('total_score')), 'average_score']
                        ]
                      }
                    ]
                  }
                ]
             
      
          }
        ],
        group: ['EvaluationResult.evaluation_id']
      });
  
      return coursesWithEvaluations;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };