const express = require('express');
const router = express.Router();
const evaluationsController = require('../../controllers/courses/evaluationController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.get('/',  authenticateToken, evaluationsController.getAllEvaluations);
router.get('/:id',  authenticateToken, evaluationsController.getEvaluationById);
router.post('/',  authenticateToken, evaluationsController.createEvaluation);

//crear evaluacion , asignando el modulo al que pertenece : http://192.168.18.3:4100/api/evaluation
router.post('/result',  authenticateToken, evaluationsController.saveEvaluationResult);
router.put('/:id',  authenticateToken, evaluationsController.updateEvaluation);
router.delete('/:id', authenticateToken,  evaluationsController.deleteEvaluation);

module.exports = router;
