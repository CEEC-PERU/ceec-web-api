const Notification = require('../../models/notificationsModel');
const sequelize = require('sequelize');
const User = require('../../models/userModel');

const NotificationService = {
  create: async (data) => {
    return await Notification.create(data);
  },
  getAll: async () => {
    return await Notification.findAll();
  },

  getById: async (id) => {
    return await Notification.findByPk(id);
  },

  update: async (id, data) => {
    return await Notification.update(data, { where: { notification_id: id } });
  },

  delete: async (id) => {
    return await Notification.destroy({ where: {notification_id : id } });
  },

  
};

module.exports = NotificationService;