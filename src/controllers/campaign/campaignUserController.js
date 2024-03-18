const campaignUserService = require('../../services/campaign/campaignUserService');

exports.getCampaignUserWithCourses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const campaignUser = await campaignUserService.getCampaignUserWithCourses(userId);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
   
  }
};

exports.createCampaignUser = async (req, res) => {
  try {
    const campaignUser = await campaignUserService.createCampaignUser(req.body);
    res.status(201).json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCampaignUser = async (req, res) => {
  try {
    const id = req.params.id;
    const campaignUser = await campaignUserService.getCampaignUser(id);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCampaignUser = async (req, res) => {
  try {
    const id = req.params.id;
    const campaignUser = await campaignUserService.updateCampaignUser(id, req.body);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCampaignUser = async (req, res) => {
  try {
    const id = req.params.id;
    const campaignUser = await campaignUserService.deleteCampaignUser(id);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};