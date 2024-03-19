const CampaignCourseService = require('../../services/campaign/campaignCourseService');

exports.
getAllCampaignCourses = async (req, res) => {
  try {
    const campaignCourses = await CampaignCourseService.getAllCampaignCourses();
    res.json(campaignCourses);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCampaignCourseById = async (req, res) => {
  try {
    const campaignCourse = await CampaignCourseService.getCampaignCourseById(req.params.id);
    res.json(campaignCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createCampaignCourse = async (req, res) => {
  try {
    const newCampaignCourse = await CampaignCourseService.createCampaignCourse(req.body);
    res.json(newCampaignCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateCampaignCourse = async (req, res) => {
  try {
    const updatedCampaignCourse = await CampaignCourseService.updateCampaignCourse(req.params.id, req.body);
    if (updatedCampaignCourse) {
      res.json(updatedCampaignCourse);
    } else {
      res.status(404).json({ error: 'Entrada de CampaignCourse no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteCampaignCourse = async (req, res) => {
  try {
    const deletedCampaignCourse = await CampaignCourseService.deleteCampaignCourse(req.params.id);
    if (deletedCampaignCourse) {
      res.json(deletedCampaignCourse);
    } else {
      res.status(404).json({ error: 'Entrada de CampaignCourse no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCampaignCoursesByCourseId = async (req, res) => {
  try {
    const campaignCourses = await CampaignCourseService.getCampaignCoursesByCourseId(req.params.courseId);
    res.json(campaignCourses);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};