const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const evaluationResultController = require('../../controllers/courses/evaluationResultController');

router.get('/', authenticateToken, evaluationResultController.getAllEvaluationResults);
router.get('/:id', authenticateToken, evaluationResultController.getEvaluationResultById);
router.post('/', authenticateToken, evaluationResultController.createEvaluationResult);
router.put('/:id', authenticateToken, evaluationResultController.updateEvaluationResult);
router.delete('/:id', authenticateToken, evaluationResultController.deleteEvaluationResult);
router.get('/by-evaluation/:evaluationId', authenticateToken, evaluationResultController.getResultsByEvaluationId);

router.get('/by-user-evaluation/:userId/:evaluationId', authenticateToken, evaluationResultController.getResultsByUserIdAndEvaluationId);
//notas por usuario y curso 
router.get('/notas/:course_id/:user_id', evaluationResultController.getResultsByCourseAndUser);

module.exports = router;
