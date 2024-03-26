const clientService = require('../../services/clients/clientsService');

const clientController = {
  create: async (req, res) => {
    const client = await clientService.create(req.body);
    res.json(client);
  },

  getAll: async (req, res) => {
    const clients = await clientService.getAll();
    res.json(clients);
  },

  getById: async (req, res) => {
    const client = await clientService.getById(req.params.id);
    res.json(client);
  },

  update: async (req, res) => {
    const client = await clientService.update(req.params.id, req.body);
    res.json(client);
  },

  delete: async (req, res) => {
    await clientService.delete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  }
};

module.exports = clientController;