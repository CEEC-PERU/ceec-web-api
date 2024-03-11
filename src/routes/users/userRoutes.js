
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userControllers');

const authenticateToken = require('../../middlewares/authenticationMiddleware');


router.post('/new', userController.createUser);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);


//todos los usuarios : admin , estudiantes : http://localhost:4100/api/users/all
router.get('/all', authenticateToken,userController.getAllUsers);

router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/students', authenticateToken, userController.getAllStudents);
router.get('/student-statistics', authenticateToken, userController.getCourseStudentsStatistics);
router.get('/students-for-course/:course_id', authenticateToken, userController.getUsersNotEnrolledInCourse);

module.exports = router;
