const express = require('express');
const router = express.Router();
const CampaignCourseController = require('../../controllers/campaign/campaignCourseController');

router.get('/', CampaignCourseController.getAllCampaignCourses);
router.get('/:id', CampaignCourseController.getCampaignCourseById);
router.get('/course/:courseId', CampaignCourseController.getCampaignCoursesByCourseId);
router.post('/', CampaignCourseController.createCampaignCourse);
router.put('/:id', CampaignCourseController.updateCampaignCourse);
router.delete('/:id', CampaignCourseController.deleteCampaignCourse);

module.exports = router;