const express = require('express');
const router = express.Router();
const flashCardController = require('../../controllers/courses/flashCardController');

router.get('/', flashCardController.getAllFlashCards);
router.get('/:id', flashCardController.getFlashCardById);
router.post('/', flashCardController.createFlashCard);
router.put('/:id', flashCardController.updateFlashCard);
//asignar flashcard creado al modulo : http://192.168.18.3:4100/flashcard/module/1001
router.get('/module/:moduleId', flashCardController.getFlashCardsByModuleId);

module.exports = router;
