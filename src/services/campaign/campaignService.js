const Campaign = require('../../models/campaignModel');

exports.getAllCampaigns = async () => {
  try {
    return await Campaign.findAll();
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