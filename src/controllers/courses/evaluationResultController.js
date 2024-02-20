const evaluationResultService = require('../../services/courses/evaluationResultService');

exports.getResultsByCourseAndUser = async (req, res) => {
  try {
    const { course_id, user_id } = req.params;
    const results = await evaluationResultService.getResultsByCourseAndUser(course_id, user_id);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve evaluation results' });
  }
};
exports.getAllEvaluationResults = async (req, res) => {
  try {
    const results = await evaluationResultService.getAllEvaluationResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getEvaluationResultById = async (req, res) => {
  const resultId = req.params.id;
  try {
    const result = await evaluationResultService.getEvaluationResultById(resultId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Resultado de evaluación no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createEvaluationResult = async (req, res) => {
  const evaluationResultData = req.body;
  try {
    const newResult = await evaluationResultService.createEvaluationResult(evaluationResultData);
    res.json(newResult);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateEvaluationResult = async (req, res) => {
  const resultId = req.params.id;
  const evaluationResultData = req.body;
  try {
    const updatedResult = await evaluationResultService.updateEvaluationResult(resultId, evaluationResultData);
    if (updatedResult) {
      res.json(updatedResult);
    } else {
      res.status(404).json({ error: 'Resultado de evaluación no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteEvaluationResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    const deletedResult = await evaluationResultService.deleteEvaluationResult(resultId);
    if (deletedResult) {
      res.json({ message: 'Resultado de evaluación eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Resultado de evaluación no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getResultsByEvaluationId = async (req, res) => {
  const evaluationId = req.params.evaluationId;
  try {
    const results = await evaluationResultService.getResultsByEvaluationId(evaluationId);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
exports.getResultsByUserIdAndEvaluationId = async (req, res) => {
  const userId = req.params.userId;
  const evaluationId = req.params.evaluationId;
  
  try {
    const results = await evaluationResultService.getResultsByUserIdAndEvaluationId(userId, evaluationId);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};