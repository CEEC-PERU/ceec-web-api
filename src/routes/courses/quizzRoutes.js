const express = require('express');
const router = express.Router();
const quizzController = require('../../controllers/courses/quizzController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

//lista de preguntas de quizzes , de diferntes tipo de evaluacion http://192.168.18.3:4100/api/quizzes/
router.get('/', authenticateToken,quizzController.getAllQuizzes);
router.get('/:id', authenticateToken, quizzController.getQuizzById);
//crear pregunta : http://192.168.18.3:4100/api/quizzes/ 
router.post('/', authenticateToken, quizzController.createQuizz);
router.put('/:id', authenticateToken, quizzController.updateQuizz);
//obtener quizzes por id de evaluacion http://192.168.18.3:4100/api/quizzes/evaluacion/1
router.get('/evaluacion/:evaluation_id', quizzController.getQuizzesByEvaluationId);
router.delete('/:id', authenticateToken, quizzController.deleteQuizz);

module.exports = router;
