const Client = require('../../models/ClientModel');
const sequelize = require('sequelize');
const clientService = {
  create: async (data) => {
    return await Client.create(data);
  },

  getAll: async () => {
    return await Client.findAll();
  },

  getById: async (id) => {
    return await Client.findByPk(id);
  },

  update: async (id, data) => {
    return await Client.update(data, { where: { client_id: id } });
  },

  delete: async (id) => {
    return await Client.destroy({ where: { client_id: id } });
  }
};

module.exports = clientService;