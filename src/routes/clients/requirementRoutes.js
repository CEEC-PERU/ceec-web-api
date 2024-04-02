// routes/requirementRoutes.js
const express = require('express');
const router = express.Router();
const requirementController = require('../../controllers/clients/requirementController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/', authenticateToken, requirementController.createRequirement);

router.get('/', authenticateToken, requirementController.getAllRequirements);

module.exports = router;
