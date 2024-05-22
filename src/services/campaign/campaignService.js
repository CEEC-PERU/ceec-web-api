const Campaign = require('../../models/campaignModel');
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

exports.getTotalCampaignUser= async (campaign_id) => {
  try {
     const campaignUsers =  await CampaignUser.findAll({
      where: { campaign_id: campaign_id }, 
      include: [
        {
          model: User,
          attributes: ['role_id', 'email'],
          where: { role_id: 1}, 
        }
      ],
      attributes: ['user_id', 'campaign_id'],
    });

    const totalUsers = campaignUsers.length
    return campaignUsers;
  } catch (error) {
    console.error(error);
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