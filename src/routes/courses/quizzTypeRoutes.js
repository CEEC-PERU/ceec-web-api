const express = require('express');
const router = express.Router();
const quizzTypeController = require('../../controllers/courses/quizzTypeConttroller');

router.get('/', quizzTypeController.getAllQuizzTypes);
router.get('/:quizztype_id', quizzTypeController.getQuizzTypeById);
router.post('/', quizzTypeController.createQuizzType);
router.put('/:quizztype_id', quizzTypeController.updateQuizzTypeById);


module.exports = router;
