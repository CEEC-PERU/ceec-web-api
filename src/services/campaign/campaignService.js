const Campaign = require('../../models/campaignModel');
const Profile = require('../../models/profileModel');
const Course = require('../../models/courseModel');
const CampaignUser = require('../../models/campaignUser');
const User = require('../../models/userModel');
const CampaignCourse = require('../../models/campaignCourse');
const sequelize = require('sequelize');

exports.getAllCampaigns = async () => {
  try {
    return await Campaign.findAll({
      
      order: [
        ['name', 'DESC']
      ]
    });
  } catch (error) {
    console.error(error);
  }
};


exports.getAllCampaignsByClientId = async (client_id , user_id) => {
  try {
    //CampaignUser ya que al useradmin se le asignara las campañas y el se encargara de asignar las campañas a sus users
    //Pero si filtro user_id y client_id , si ingresa otro usuario debo de asignar otra vez las campaigns 
    return await CampaignUser.findAll({
      include: [
        {
          model: User,
          attributes: ['client_id'],
          where: { client_id :client_id , user_id :user_id }, 
        },
        {
          model: Campaign,
          attributes: ['name'],
        }
      ],
      attributes: ['user_id', 'campaign_id'],
    });
  } catch (error) {
    console.error(error);
  }
};


exports.getAllCourseCampaign = async (client_id , user_id) => {
  try {
    //CampaignUser ya que al useradmin se le asignara las campañas y el se encargara de asignar las campañas a sus users
    //Obtener los cursos que retornan el campaignUser
    const campaignUsers = await CampaignUser.findAll({
      include: [
        {
          model: User,
          attributes: ['client_id'],
          where: { client_id :client_id , user_id :user_id }, 
        }
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
    include: [
      {
        model: Course,
        attributes: ['name'],
      },
      {
        model: Campaign,
        attributes: ['name'],
      },
    ],
    attributes: ['course_id', 'campaign_id'],
  });

  return campaignCourses;
  } catch (error) {
    console.error(error);
  }
};

exports.getTotalCampaignUser = async (client_id, user_id) => {
  try {
    // Retrieve all campaigns that will be used later
    const campaigns = await CampaignUser.findAll({
      include: [
        {
          model: User,
          attributes: ['client_id'],
          where: { client_id: client_id, user_id: user_id },
        },
        {
          model: Campaign,
          attributes: ['name'],
        }
      ],
      attributes: ['user_id', 'campaign_id'],
    });

    // Extract campaign IDs from the retrieved campaigns
    const campaignIds = campaigns.map(campaign => campaign.campaign_id);

    // Retrieve users enrolled in each campaign to later count the total number of users per campaign
    const campaignUsers = await CampaignUser.findAll({
      where: { campaign_id: campaignIds },
      include: [
        {
          model: User,
          attributes: ['role_id', 'email'],
          where: { role_id: 1, client_id: client_id },
        }
      ],
      attributes: ['user_id', 'campaign_id'],
    });

    // Group campaign users by campaign_id and count the number of users per campaign
    const userCounts = campaignUsers.reduce((acc, user) => {
      acc[user.campaign_id] = (acc[user.campaign_id] || 0) + 1;
      return acc;
    }, {});

    // Add totalUsers to each campaign object
    const results = campaigns.map(campaign => ({
      ...campaign.toJSON(),
      totalUsers: userCounts[campaign.campaign_id] || 0,
    }));

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



exports.getUsersNotAsignado = async (client_id) => {
  try {
    // Find all users belonging to the client
    const allUsers = await User.findAll({
      attributes: ['user_id', 'email'],
      where: { client_id: client_id, role_id: 1 },
      include: [
        {
          model: Profile,
          attributes: ['first_name', 'last_name', 'profile_picture', 'phone'],
        }
      ]
    });

    // Find users assigned to campaigns
    const usersAssignedToCampaigns = await CampaignUser.findAll({
      attributes: ['user_id'],
      include: [
        {
          model: User,
          attributes: [],
          where: { client_id: client_id, role_id: 1 },
        }
      ]
    });

    // Extract user IDs of users assigned to campaigns
    const assignedUserIds = usersAssignedToCampaigns.map(campaignUser => campaignUser.user_id);

    // Filter out users who are not assigned to any campaign
    const usersNotAssigned = allUsers.filter(user => !assignedUserIds.includes(user.user_id));

    return usersNotAssigned;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.getCampaignById = async (campaignId) => {
  try {
    return await Campaign.findByPk(campaignId);
  } catch (error) {
    console.error(error);
  }
};

exports.createCampaign = async (campaignData) => {
  try {
    return await Campaign.create(campaignData);
  } catch (error) {
    console.error(error);
  }
};

exports.updateCampaign = async (campaignId, campaignData) => {
  try {
    const campaign = await Campaign.findByPk(campaignId);
    if (campaign) {
      await campaign.update(campaignData);
      return campaign;
    };
    return null;
  } catch (error) {
    console.error(error);
  }
};

exports.deleteCampaign = async (campaignId) => {
  try {
    const campaign = await Campaign.findByPk(campaignId);
    if (campaign) {
      await campaign.destroy();
      return campaign;
    };
    return null;
  } catch (error) {
    console.error(error);
  }
};