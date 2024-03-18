const express = require('express');
const router = express.Router();
const appSessionController = require('../../controllers/users/appSessionController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');



router.get('/', authenticateToken, appSessionController.getAppSessions);
router.get('/inactive', authenticateToken, appSessionController.getInactiveUsersController);
router.get('/last-login/:userId', authenticateToken, appSessionController.getLastLoginController);
router.get('/activity-count/:date', authenticateToken, appSessionController.getUsersActivityCountController);

module.exports = router;