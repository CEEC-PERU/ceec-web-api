const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/clients/clientsController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/', authenticateToken, clientController.create);
router.get('/', authenticateToken, clientController.getAll);
router.get('/:id', authenticateToken, clientController.getById);
router.put('/:id', authenticateToken, clientController.update);
router.delete('/:id', authenticateToken, clientController.delete);

module.exports = router;