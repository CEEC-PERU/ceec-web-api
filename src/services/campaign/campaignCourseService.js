const CampaignCourse = require('../../models/campaignCourse');

const Campaign = require('../../models/campaignModel');
const Course = require('../../models/courseModel');

exports.getAllCampaignCourses = async () => {
  try {
    return await CampaignCourse.findAll({
      include: [
        {
          model: Campaign,
          attributes: ['name', 'description', 'is_finish', 'limit_date', 'image'],
        },
        {
          model: Course,
          attributes: ['name', 'description', 'is_active', 'is_finish', 'limit_date', 'image'],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getCampaignCourseById = async (campaignCourseId) => {
  try {
    return await CampaignCourse.findByPk(campaignCourseId);
  } catch (error) {
    console.error(error);
  }
};

exports.createCampaignCourse = async (campaignCourseData) => {
  try {
    return await CampaignCourse.create(campaignCourseData);
  } catch (error) {
    console.error(error);
  }
};

exports.updateCampaignCourse = async (campaignCourseId, campaignCourseData) => {
  try {
    const campaignCourse = await CampaignCourse.findByPk(campaignCourseId);
    if (campaignCourse) {
      await campaignCourse.update(campaignCourseData);
      return campaignCourse;
    };
    return null;
  } catch (error) {
    console.error(error);
  }
};

//eliminar por campaña de curso
exports.deleteCampaignCourse = async (campaignCourseId) => {
  try {
    const campaignCourse = await CampaignCourse.findByPk(campaignCourseId);
    if (campaignCourse) {
      await campaignCourse.destroy();
      return campaignCourse;
    };
    return null;
  } catch (error) {
    console.error(error);
  }
};

//obtener por courso_id
exports.getCampaignCoursesByCourseId = async (courseId) => {
  try {
    return await CampaignCourse.findAll({
      where: {
        course_id: courseId
      }
    });
  } catch (error) {
    console.error(error);
  }
};