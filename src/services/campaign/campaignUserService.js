
const Campaign = require('../../models/campaignModel');
const CampaignUser = require('../../models/campaignUser');
const CampaignCourse = require('../../models/campaignCourse');
const Course = require('../../models/courseModel');
const User =require('../../models/userModel');

exports.getCampaignUserWithCourses = async (userId) => {
  try {
    // Buscar la campaña a la que pertenece el usuario
    const userCampaign = await CampaignUser.findOne({
      where: { user_id: userId },
      include: [{ model: Campaign }],
    });

    if (!userCampaign) {
      return null; // El usuario no está asociado a ninguna campaña
    }

    const campaignCourses = await CampaignCourse.findAll({
      where: { campaign_id: userCampaign.campaign_id },
      include: [{ model: Course }],
    });

    return { /*userCampaign,*/ campaignCourses };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.createCampaignUser = async (campaignUser) => {
  try {
    return await CampaignUser.create(campaignUser);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getCampaignUser = async (id) => {
  try {
    return await CampaignUser.findByPk(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.saveCampaignStudent = async (course_student) => {
  try {
    const courseStudent = await CampaignUser.create(course_student);
    return courseStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.updateCampaignUser = async (id, campaignUser) => {
  try {
    return await CampaignUser.update(campaignUser, {
      where: {
        id_campaign_user: id
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deleteCampaignUser = async (id) => {
  try {
    const campaignUser = await CampaignUser.findByPk(id);
    if (campaignUser) {
      await campaignUser.destroy();
      return campaignUser;
    };
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

