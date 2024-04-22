const Notification = require('../../models/notificationsModel');
const { Expo } = require('expo-server-sdk');


const expo = new Expo({
  accessToken: process.env.ACCESS_TOKEN,
  useFcmV1: true 
});
//
const notificationController = {
  sendNotification: async (req, res) => {
    try {
      const { title, message } = req.body;

      // Obtener todos los tokens de los usuarios desde la base de datos
      const notifications = await Notification.findAll();

      if (!notifications || notifications.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      // Enviar la notificación a cada token de usuario
      const notificationMessages = notifications.map(notification => ({
        to: notification.token,
        sound: 'default',
        body: message,
        title: title,
      }));

    
      // La API de FCM v1 acepta lotes de notificaciones, por lo que agrupamos las notificaciones
      const chunks = expo.chunkPushNotifications(notificationMessages);
      const tickets = [];
      // Enviar lotes de notificaciones
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error('Error sending notification chunk:', error);
        }
      }

      res.status(200).json({ message: 'Notification sent successfully', tickets });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Error sending notification' });
    }
  }
};


module.exports = notificationController;



/*

const expo = new Expo({ accessToken: process.env.ACCESS_TOKEN });
//el title y message definir en un archivo , definir a las 5:40 pm y 8 am se envie notificacion y en el index ejecutar solo la funcion, 
//ya no sera por rutas
const notificationController = {
  sendNotification: async (req, res) => {
    try {
      const { title, message } = req.body;
      
      // Obtener todos los tokens de los usuarios desde la base de datos
      const notifications = await Notification.findAll();
      
      if (!notifications || notifications.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      // Enviar la notificación a cada token de usuario
      const notificationMessages = notifications.map(notification => ({
        to: notification.token,
        sound: 'default',
        body: message,
        title: title,
      }));

      const tickets = await Promise.all(notificationMessages.map(message =>
        expo.sendPushNotificationsAsync([message])
      ));

      res.status(200).json({ message: 'Notification sent successfully', tickets });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Error sending notification' });
    }
  }
};





module.exports = notificationController;

//*/