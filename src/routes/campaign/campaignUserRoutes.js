const express = require('express');
const router = express.Router();
const campaignUserController = require('../../controllers/campaign/campaignUserController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');
//obtener  cursos asignados a la campaña por user_id : http://localhost:4100/api/campaignuser/courses/7
router.get('/courses/:user_id', authenticateToken, campaignUserController.getCampaignUserWithCourses);
router.post('/', authenticateToken, campaignUserController.createCampaignUser);
router.post('/campaignsusers', authenticateToken, campaignUserController.postCampaignsStudents);
router.get('/:id', authenticateToken, campaignUserController.getCampaignUser);
router.put('/:id', authenticateToken, campaignUserController.updateCampaignUser);
router.delete('/:id', authenticateToken, campaignUserController.deleteCampaignUser);

module.exports = router;