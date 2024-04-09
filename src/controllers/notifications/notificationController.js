/*const express = require('express');
const { Expo } = require('expo-server-sdk');
const app = express();
const expo = new Expo();
*/
const notificationService = require('../../services/notifications/notificationService');
const notificationController = {
  create: async (req, res) => {
    const client = await notificationService.create(req.body);
    res.json(client);
  },
  
  getAll: async (req, res) => {
    const clients = await notificationService.getAll();
    res.json(clients);
  },

  getById: async (req, res) => {
    const client = await notificationService.getById(req.params.id);
    res.json(client);
  },

  update: async (req, res) => {
    const client = await notificationService.update(req.params.id, req.body);
    res.json(client);
  },

  delete: async (req, res) => {
    await notificationService.delete(req.params.id);
    res.json({ message: 'Notification deleted successfully' });
  }
};
module.exports = notificationController;




/*
// Endpoint para enviar notificaciones push
app.post('/send-notification', async (req, res) => {
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
            title: title || 'Notification Title',
            body: body || 'Notification Body',
        };

        // Enviar la notificación
        const response = await expo.sendPushNotificationsAsync([message]);
        res.json(response);
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Error sending notification' });
    }
});

*/