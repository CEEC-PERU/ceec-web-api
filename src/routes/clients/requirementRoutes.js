// routes/requirementRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;



const requirementController = require('../../controllers/clients/requirementController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');


router.get('/', authenticateToken, requirementController.getAllRequirements);

router.post('/',  upload.array('files'), requirementController.createRequirement);


// Configurar o Cloudinary
cloudinary.config({
  cloud_name: 'dk2red18f',
  api_key: '647789177635785',
  api_secret: 'xa2vaybRQMfxna7Gd2oqrQg8eUg'
});

// Endpoint para upload de arquivos
router.post('/upload', async (req, res) => {
  try {
    const files = req.files; // Supondo que você está usando algum middleware para lidar com os uploads de arquivos

    const urls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path); // Faz o upload do arquivo para o Cloudinary
      urls.push(result.secure_url); // Adiciona a URL do arquivo ao array de URLs
    }

    res.status(200).json({ urls });
  } catch (error) {
    console.error('Erro ao fazer upload para o Cloudinary:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao processar sua solicitação' });
  }
});

module.exports = router;
