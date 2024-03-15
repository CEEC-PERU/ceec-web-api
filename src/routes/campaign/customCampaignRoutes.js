const express = require('express');
const router = express.Router();
const CustomCampaignController = require('../../controllers/campaign/customCampaignController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
//no hay token
router.get('/course/:courseId', CustomCampaignController.getCampaignCoursesByCourseId);
router.get('/campaign/:campaignId', CustomCampaignController.getCampaignCoursesByCampaignId);
router.get('/:campaignId/:courseId/', CustomCampaignController.getCampaignCourseByCourseAndCampaign);

module.exports = router;