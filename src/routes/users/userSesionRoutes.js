const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userSesionController');

router.get('/summary', userController.getUserSummary);

module.exports = router;