const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const notificationController = require('../../controllers/notifications/notificationController');
const notificationController2 = require('../../controllers/notifications/sendNotification');
router.post('/send-notification', notificationController2.sendNotification);
router.post('/',authenticateToken, notificationController.create);
router.get('/', authenticateToken,notificationController.getAll);
router.get('/:id',authenticateToken, notificationController.getById);
router.put('/:id',authenticateToken, notificationController.update);
router.delete('/:id',authenticateToken, notificationController.delete);

module.exports = router;








/*const { Expo } = require('expo-server-sdk');*/
/*
const app = express();*/
/*const expo = new Expo();*/
/*
// Endpoint para enviar notificaciones push
router.post('/send-notification', async (req, res) => {
    try {
        // Token de notificación obtenido desde el cliente de Expo
        const { token, title, body } = req.body;

        // Validar el token de notificación
        if (!Expo.isExpoPushToken(token)) {
            return res.status(400).json({ error: 'Invalid Expo Push Token' });
        }

        // Construir el mensaje de notificación
        const message = {
            to: token,
            sound: 'default',
            title: title || 'Notification Title ',
            body: body || 'Notification Body EXAMPLE',
        };

        // Enviar la notificación
        const response = await expo.sendPushNotificationsAsync([message]);
        res.json(response);
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Error sending notification' });
    }
});


module.exports = router;
*/