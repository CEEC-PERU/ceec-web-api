const CampaignCourseService = require('../../services/campaign/customCampaingService');

exports.getCampaignCoursesByCourseId = async (req, res) => {
  try {
    const campaignCourses = await CampaignCourseService.getCampaignCoursesByCourseId(req.params.courseId);
    res.json(campaignCourses);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCampaignCourseByCourseAndCampaign = async (req, res) => {
  try {
    const campaignCourse = await CampaignCourseService.getCampaignCourseByCourseAndCampaign(req.params.courseId, req.params.campaignId);
    res.json(campaignCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCampaignCoursesByCampaignId = async (req, res) => {
  try {
    const campaignCourses = await CampaignCourseService.getCampaignCoursesByCampaignId(req.params.campaignId);
    res.json(campaignCourses);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
