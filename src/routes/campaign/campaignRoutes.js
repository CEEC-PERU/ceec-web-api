const app = require('express')
const router = app.Router()

const authenticateToken = require('../../middlewares/authenticationMiddleware');
const CampaignController = require('../../controllers/campaign/campaignController')

router.get('/', authenticateToken, CampaignController.getAllCampaigns);
router.get('/:id', authenticateToken, CampaignController.getCampaignById);
router.post('/', authenticateToken, CampaignController.createCampaign);
router.put('/:id', authenticateToken, CampaignController.updateCampaign);
router.delete('/:id', authenticateToken, CampaignController.deleteCampaign);

module.exports = router;
