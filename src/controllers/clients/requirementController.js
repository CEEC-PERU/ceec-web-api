const Requirement = require('../../models/requirementModel');

const cloudinary = require('cloudinary').v2;
// controllers/requirementController.js
const requirementService = require('../../services/clients/requirementService');

cloudinary.config({
  cloud_name: 'dk2red18f',
  api_key: '647789177635785',
  api_secret: 'xa2vaybRQMfxna7Gd2oqrQg8eUg'
});

exports.createRequirement = async (req, res) => {
  try {
    // Subir imágenes a Cloudinary y obtener URLs
    const materialURLs = await requirementService.uploadImages(req.body.material);
    // Crear el requerimiento en la base de datos con las URLs de material
    const requirement = await Requirement.create({
      fecha: req.body.fecha,
      campaign_id: req.body.campaign_id,
      user_id: req.body.user_id,
      course_name: req.body.course_name,
      n_modulos: req.body.n_modulos,
      material: materialURLs
    });
    res.status(201).json(requirement);
  } catch (error) {
    console.error('Error al crear el requerimiento:', error);
    res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud' });
  }
};

/*
exports.createRequirement = async (req, res) => {
  try {
    const { files } = req;
    const urls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      urls.push(result.secure_url);
    }

    // Crear el requirement en la base de datos con las URL de los archivos
    const requirement = await Requirement.create({
      fecha: req.body.fecha,
      campaign_id: req.body.campaign_id,
      user_id: req.body.user_id,
      course_name: req.body.course_name,
      n_modulos: req.body.n_modulos,
      material: urls
    });

    res.status(201).json(requirement);
  } catch (error) {
    console.error('Error al crear el requirement:', error);
    res.status(500).json({ message: 'Ocurrió un error al procesar tu solicitud' });
  }
};*/

exports.getAllRequirements = async (req, res) => {
    try {
        const requirements = await requirementService.getAllRequirements();
        res.status(200).json(requirements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};