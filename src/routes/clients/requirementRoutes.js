const express = require('express');
const router = express.Router();
const multer = require('multer');
const requirementController = require('../../controllers/clients/requirementController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

const storage = multer.memoryStorage(); // Define storage antes de configurar multer
const upload = multer({ storage: storage });

router.get('/', authenticateToken, requirementController.getAllRequirements);
router.post('/', requirementController.createRequirement);
router.post('/upload',  [authenticateToken, upload.single('image')], requirementController.uploadImage);



module.exports = router;
