const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const preQuizzController = require('../../controllers/courses/preQuizzController');

router.get('/', authenticateToken, preQuizzController.getAllPreQuizzes);
router.get('/:id', authenticateToken, preQuizzController.getPreQuizzById);
router.post('/', authenticateToken, preQuizzController.createPreQuizz);
router.put('/:id', authenticateToken, preQuizzController.updatePreQuizz);
router.delete('/:id', authenticateToken, preQuizzController.deletePreQuizz);
router.get('/by-course/:course_id', authenticateToken, preQuizzController.getPreQuizzesByCourseId);

module.exports = router;
