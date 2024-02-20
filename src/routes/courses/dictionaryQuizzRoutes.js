const app = require('express');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const dictionaryQuizzesController = require('../../controllers/courses/dictionaryQuizzController');
const router = app.Router();

router.get('/:id', authenticateToken, dictionaryQuizzesController.getDictionaryQuizzesByModule);

router.post('/', authenticateToken, dictionaryQuizzesController.postDictionary);


module.exports = router