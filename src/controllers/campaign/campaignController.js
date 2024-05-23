const CampaignService = require('../../services/campaign/campaignService');

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getAllCampaignsByClientId = async (req, res) => {
  try {
    const campaigns = await CampaignService.getAllCampaignsByClientId(req.params.client_id, req.params.user_id);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



exports.getAllCourseCampaign = async (req, res) => {
  try {
    const campaigns = await CampaignService.getAllCourseCampaign(req.params.client_id, req.params.user_id);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getTotalCampaignUser = async (req, res) => {
  try {
    const campaigns = await CampaignService.getTotalCampaignUser( req.params.client_id , req.params.user_id);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUsersNotAsignado= async (req, res) => {
  try {
    const campaigns = await CampaignService.getUsersNotAsignado( req.params.client_id);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await CampaignService.getCampaignById(req.params.id);
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = await CampaignService.createCampaign(req.body);
    res.json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await CampaignService.updateCampaign(req.params.id, req.body);
    if (updatedCampaign) {
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ error: 'Campaña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const deletedCampaign = await CampaignService.deleteCampaign(req.params.id);
    if (deletedCampaign) {
      res.json(deletedCampaign);
    } else {
      res.status(404).json({ error: 'Campaña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};