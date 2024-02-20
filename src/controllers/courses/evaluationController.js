const evaluationService = require('../../services/courses/evaluationService');

exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await evaluationService.getAllEvaluations();
    res.json(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEvaluationById = async (req, res) => {
  const evaluationId = req.params.id;
  try {
    const evaluation = await evaluationService.getEvaluationById(evaluationId);
    if (evaluation) {
      res.json(evaluation);
    } else {
      res.status(404).json({ error: 'Evaluation not found' });
    }
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEvaluation = async (req, res) => {
  const { name, module_id } = req.body;
  try {
    const newEvaluation = await evaluationService.createEvaluation({ name, module_id });
    res.json(newEvaluation);
  } catch (error) {
    console.error('Error creating evaluation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEvaluation = async (req, res) => {
  const evaluationId = req.params.id;
  const { name, description, note, module_id } = req.body;
  try {
    const updatedEvaluation = await evaluationService.updateEvaluation(evaluationId, { name, description, note, module_id });
    if (updatedEvaluation) {
      res.json(updatedEvaluation);
    } else {
      res.status(404).json({ error: 'Evaluation not found' });
    }
  } catch (error) {
    console.error('Error updating evaluation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEvaluation = async (req, res) => {
  const evaluationId = req.params.id;
  try {
    const deletedEvaluation = await evaluationService.deleteEvaluation(evaluationId);
    if (deletedEvaluation) {
      res.json({ message: 'Evaluation deleted successfully' });
    } else {
      res.status(404).json({ error: 'Evaluation not found' });
    }
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.saveEvaluationResult = async (req, res) => {
  try {
    const {
      user_id,
      evaluation_id,
      note,
    } = req.body;
  
    const evaluationResult = await evaluationService.saveResultEvaluation({ user_id, evaluation_id, note });
    console.log(evaluationResult)
    res.json(evaluationResult);
  } catch (error) {
    console.error('Error saving evaluation result:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
