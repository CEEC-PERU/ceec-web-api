const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const dictionaryQuizController = require('../../controllers/courses/dictionaryController');

router.get('/', authenticateToken, dictionaryQuizController.getAllDictionaryQuizzes);
router.get('/:id', authenticateToken, dictionaryQuizController.getDictionaryQuizById);
router.post('/', authenticateToken, dictionaryQuizController.createDictionaryQuiz);
router.put('/:id', authenticateToken, dictionaryQuizController.updateDictionaryQuiz);
router.delete('/:id', authenticateToken, dictionaryQuizController.deleteDictionaryQuiz);
router.get('/by-module/:module_id', authenticateToken, dictionaryQuizController.getDictionaryQuizzesByModuleId);

module.exports = router;
