const authenticateToken = require('../../middlewares/authenticationMiddleware');
const customEvaluationController = require('../../controllers/courses/customEvaluationController')
const app = require('express')
const router = app.Router()

router.get('/:id', authenticateToken, customEvaluationController.getEvaluationByModule);
router.post('/', authenticateToken, customEvaluationController.postEvaluationWithQuestions);

module.exports = router