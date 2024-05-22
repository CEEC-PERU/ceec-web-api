const app = require('express')
const router = app.Router()

const authenticateToken = require('../../middlewares/authenticationMiddleware');
const CampaignController = require('../../controllers/campaign/campaignController')

router.get('/', authenticateToken, CampaignController.getAllCampaigns);
router.get('/client/user/:client_id/:user_id', authenticateToken, CampaignController.getAllCampaignsByClientId);
router.get('/courses/:client_id/:user_id', authenticateToken, CampaignController.getAllCourseCampaign);
router.get('/campaigns/userscount/:campaign_id', authenticateToken, CampaignController.getTotalCampaignUser);
router.get('/:id', authenticateToken, CampaignController.getCampaignById);
router.post('/', authenticateToken, CampaignController.createCampaign);
router.put('/:id', authenticateToken, CampaignController.updateCampaign);
router.delete('/:id', authenticateToken, CampaignController.deleteCampaign);

module.exports = router;
