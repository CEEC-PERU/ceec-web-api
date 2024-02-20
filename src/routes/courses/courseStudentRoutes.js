const express = require('express');
const router = express.Router();
const coursestudentController = require('../../controllers/courses/courseStudentController');

//asignar curso creado al estudiante : http://192.168.18.3:4100/coursestudent
router.post('/', coursestudentController.createCourseStudent);


router.get('/', coursestudentController.getAllCourseStudents);

router.get('/all-data', coursestudentController.getAllCourseStudentsWithDetails);

router.get('/:user_id', coursestudentController.getCourseStudentsByUserId);

router.get('/course/:course_id', coursestudentController.getAllCourseStudentsByCourseId);



module.exports = router;
