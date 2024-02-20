const express = require('express')
const router = express.Router()
const authenticateToken = require('../../middlewares/authenticationMiddleware')
const customAdminController = require('../../controllers/courses/customAdminController')


const customModuleController = require('../../controllers/courses/customModuleController');

router.get('/cursesmodules', authenticateToken, customAdminController.getCoursesModules);

router.get('/coursesmodules', authenticateToken, customAdminController.getCoursesModules);


//Filtro de cursos por user_id : http://localhost:4100/api/custom/coursesuser/${id}
router.get('/coursesuser/:id', authenticateToken, customAdminController.getCoursesByUser);

router.get('/coursesuser/', authenticateToken, customAdminController.getCoursesAndUsers);

//Filtro de modulos por courseId: http://localhost:4100/api/custom/${courseId}/modules 
router.get('/:courseId/modules',authenticateToken, customModuleController.getModulesByCourse);



module.exports = router