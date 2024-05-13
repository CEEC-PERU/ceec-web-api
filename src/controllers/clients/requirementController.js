const Requirement = require('../../models/requirementModel');
const cloudinary = require("../../services/courses/imageService");

// controllers/requirementController.js
const requirementService = require('../../services/clients/requirementService');


exports.uploadImage = async (req, res) => {
  try {
      await cloudinary.uploader.upload_stream(
          { folder: "ceec" },
          (error, result) => {
              if (error) {
                  console.error(error);
                  res.status(500).json({ error: "Error at upload image" })
              } else {
                  console.log("result.secure_url", result.secure_url)
                  res.json({ imageUrl: result.secure_url });
              }
          }
      ).end(req.file.buffer);
  } catch (error) {
      console.error('Error uploading image:', error.error.code, error.error.syscall);
      return res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
  }
}

exports.createRequirement = async (req, res) => {
  const {fecha,campaign_id,user_id,course_name,n_modulos,material } = req.body;
  try {
    await requirementService.create({ fecha , campaign_id , user_id,  course_name , n_modulos , material });
    res.json({ message: "Requerimiento creado eistosamente" });
  } catch (error) {
    console.error('Error al crear el requerimiento:', error);
    res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud' });
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