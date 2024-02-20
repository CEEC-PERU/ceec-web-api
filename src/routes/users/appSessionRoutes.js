const express = require('express');
const router = express.Router();
const appSessionController = require('../../controllers/users/appSessionController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.get('/', authenticateToken, appSessionController.getAppSessions);

module.exports = router;