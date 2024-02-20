
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userControllers');

const authenticateToken = require('../../middlewares/authenticationMiddleware');


router.post('/users', userController.createUser);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);


//todos los usuarios : admin , estudiantes : http://localhost:4100/api/users/users
router.get('/users', authenticateToken,userController.getAllUsers);

router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/student-statistics', authenticateToken, userController.getCourseStudentsStatistics);

module.exports = router;
