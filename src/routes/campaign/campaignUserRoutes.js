const express = require('express');
const router = express.Router();
const campaignUserController = require('../../controllers/campaign/campaignUserController');

router.get('/courses/:userId', campaignUserController.getCampaignUserWithCourses);
router.post('/', campaignUserController.createCampaignUser);
router.get('/:id', campaignUserController.getCampaignUser);
router.put('/:id', campaignUserController.updateCampaignUser);
router.delete('/:id', campaignUserController.deleteCampaignUser);

module.exports = router;