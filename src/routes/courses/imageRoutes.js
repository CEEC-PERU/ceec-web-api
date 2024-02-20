const { Router } = require("express");
const router = Router();
const imageController = require("../../controllers/courses/imageController");
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const multer = require("multer")
const storage = multer.memoryStorage();
const upload  = multer({storage});

router.post('/upload',  [authenticateToken, upload.single('image')],  imageController.uploadImage);


module.exports = router;

