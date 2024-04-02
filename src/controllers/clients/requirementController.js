
// controllers/requirementController.js
const requirementService = require('../../services/clients/requirementService');

exports.createRequirement = async (req, res) => {
    try {
        // Convertir la fecha a un formato reconocido por JavaScript
        const [day, month, year] = req.body.fecha.split('-');
        req.body.fecha = new Date(`20${year}-${month}-${day}`);

        const requirement = await requirementService.createRequirement(req.body);
        console.log(req.body.fecha)
        res.status(200).json(requirement);
    } catch (error) {
        res.status(500).json({ message: error.message });
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