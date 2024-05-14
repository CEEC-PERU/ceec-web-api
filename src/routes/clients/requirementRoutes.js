const express = require('express');
const router = express.Router();
const multer = require('multer');
const requirementController = require('../../controllers/clients/requirementController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.get('/', authenticateToken, requirementController.getAllRequirements);
router.post('/', authenticateToken,requirementController.createRequirement);



module.exports = router;
