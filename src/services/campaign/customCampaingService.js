const CampaignCourse = require('../../models/campaignCourse');
const Campaign = require('../../models/campaignModel');
const Course = require('../../models/courseModel');

exports.getCampaignCoursesByCourseId = async (courseId) => {
    try {
      return await CampaignCourse.findAll({
        where: {
          course_id: courseId
        },
        include: [
          {
            model: Campaign,
          },
          {
            model: Course,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
exports.getCampaignCourseByCourseAndCampaign = async (courseId, campaignId) => {
    try {
      return await CampaignCourse.findAll({
        where: {
          course_id: courseId,
          campaign_id: campaignId
        },
        include: [
          {
            model: Campaign,
          },
          {
            model: Course,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  exports.getCampaignCoursesByCampaignId = async (campaignId) => {
    try {
      return await CampaignCourse.findAll({
        where: {
          campaign_id: campaignId
        },
        include: [
          {
            model: Campaign,
          },
          {
            model: Course,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };