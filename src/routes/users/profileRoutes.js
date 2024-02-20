const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/users/profileController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');



router.post('/profiles/:user_id', authenticateToken, profileController.createProfile);
router.get('/profiles/:profileId',authenticateToken  ,profileController.getProfileById);
router.put('/profiles/:user_id', authenticateToken,  profileController.updateProfile);
router.delete('/profiles/:profileId',authenticateToken,   profileController.deleteProfile);
router.get('/profiles', authenticateToken,  profileController.getAllProfiles);
//Queries customized
router.get('/alldata/:userId', authenticateToken, profileController.getAllUserProfileData);

router.get('/document-types/', authenticateToken, profileController.getDocumentTypes);

module.exports = router;
