
// controllers/requirementController.js
const requirementService = require('../../services/clients/requirementService');


exports.createRequirement = async (req, res) => {
    try {
      const { files } = req; // Supondo que você está usando algum middleware para lidar com os uploads de arquivos
      const [day, month, year] = req.body.fecha.split('-');
      req.body.fecha = new Date(`20${year}-${month}-${day}`);
      // Fazer upload de arquivos para o Cloudinary e obter URLs
      const urls = await requirementService.uploadFilesAndSaveURLs(files);
      console.log(req.body.fecha)
      // Atualizar o corpo da solicitação com as URLs
      req.body.material = urls;
  
      // Criar o requirement no banco de dados
      const requirement = await requirementService.createRequirement(req.body);
  
      res.status(200).json(requirement);
    } catch (error) {
      console.error('Erro ao criar requirement:', error);
      res.status(500).json({ message: 'Ocorreu um erro ao processar sua solicitação' });
    }
  };

exports.getAllRequirements = async (req, res) => {
    try {
        const requirements = await requirementService.getAllRequirements();
        res.status(200).json(requirements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};