// routes/requirementRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;



const requirementController = require('../../controllers/clients/requirementController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');


router.get('/', authenticateToken, requirementController.getAllRequirements);

router.post('/', requirementController.createRequirement);

module.exports = router;
