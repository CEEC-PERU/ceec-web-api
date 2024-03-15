const CampaignCourse = require('../../models/campaignCourse');
const Campaign = require('../../models/campaignModel');
const CampaignUser = require('../../models/campaignUser');
const Course = require('../../models/courseModel');
const User =require('../../models/userModel');

exports.getCampaignUserWithCourses = async (userId) => {
  try {
    const campaignUsers = await CampaignUser.findAll({
      where: { user_id: userId },
      include: [User]
    });

    const campaignCourses = await Promise.all(
      campaignUsers.map(async (campaignUser) => {
        const courses = await CampaignCourse.findAll({
          where: { campaign_id: campaignUser.campaign_id },
          include: [Course]
        });
        return { ...campaignUser.toJSON(), CampaignCourse: courses };
      })
    );

    return campaignCourses;
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

exports.getCampaignUserWithCourses = async (userId) => {
  try {
    return await CampaignUser.findAll({
      where: { user_id: userId },
      include: [
        {
          model: CampaignCourse,
          include: [
            {
              model: Course,
            }
          ],
        }
      ],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};