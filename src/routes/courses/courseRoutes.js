const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/courses/courseController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

//todos los cursos :http://192.168.18.3:4100/api/courses/
router.get('/', authenticateToken, coursesController.getAllCourses);
//info de curso por id_course : http://192.168.18.3:4100/api/courses/2
router.get('/:id', authenticateToken, coursesController.getCourseById);
//agregar un nuevo curso :http://192.168.18.3:4100/api/courses/
router.post('/', authenticateToken, coursesController.createCourse);
router.put('/:id', authenticateToken, coursesController.updateCourse);
router.delete('/:id', authenticateToken, coursesController.deleteCourse);

router.get('/modules/all', authenticateToken, coursesController.getCoursesWithModules);

module.exports = router;
