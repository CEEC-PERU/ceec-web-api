const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const prequizzResultController = require('../../controllers/courses/prequizzResultController');

router.get('/:id', authenticateToken, prequizzResultController.getPrequizzResultById);
router.post('/', authenticateToken, prequizzResultController.createPrequizzResult);
router.put('/:id', authenticateToken, prequizzResultController.updatePrequizzResult);
router.delete('/:id', authenticateToken, prequizzResultController.deletePrequizzResult);
router.get('/', authenticateToken, prequizzResultController.getAllPrequizzResults);


module.exports = router;
