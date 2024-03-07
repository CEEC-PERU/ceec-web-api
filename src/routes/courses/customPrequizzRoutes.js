const app = require('express')
const router = app.Router()

const authenticateToken = require('../../middlewares/authenticationMiddleware');
const customPrequizzController = require('../../controllers/courses/customPrequizResultController')


router.get('/:id', authenticateToken, customPrequizzController.getEvaluationByCourse);
router.get('/usercourse/:userId/:courseId', authenticateToken, customPrequizzController.getEvaluationByUserandCourse);

module.exports = router