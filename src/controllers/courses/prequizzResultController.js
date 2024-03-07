const PrequizzResultService = require('../../services/courses/prequizzResultService');


exports.createPrequizzResult = async (req, res) => {
  const prequizzResultData = req.body;
  try {
    const newResult = await PrequizzResultService.createPrequizzResult(prequizzResultData);
    res.json(newResult);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updatePrequizzResult = async (req, res) => {
    const resultId = req.params.id;
    const evaluationResultData = req.body;
    try {
      const updatedResult = await PrequizzResultService.updatePrequizzResult(resultId, evaluationResultData);
      if (updatedResult) {
        res.json(updatedResult);
      } else {
        res.status(404).json({ error: 'Resultado de evaluación no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getPrequizzResultById = async (req, res) => {
    const resultId = req.params.id;
    try {
      const result = await PrequizzResultService.getPrequizzResultById(resultId);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Resultado de evaluación no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };