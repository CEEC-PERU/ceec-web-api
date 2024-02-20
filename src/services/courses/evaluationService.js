const Evaluation = require('../../models/evaluationModel');
const EvaluationResult = require('../../models/evaluationResultModel');

exports.getAllEvaluations = async () => {
  try {
    return await Evaluation.findAll();
  } catch (error) {
    console.error(error)
  }
};

exports.getEvaluationById = async (evaluationId) => {
  try {
    return await Evaluation.findByPk(evaluationId);
  } catch (error) {
    console.error(error)
  }
};

exports.createEvaluation = async (evaluationData) => {
  try {
    return await Evaluation.create(evaluationData);
  } catch (error) {
    console.error(error)
    return {error: "Error en el servicio al crear la evaluación"}
  }
};

exports.updateEvaluation = async (evaluationId, evaluationData) => {
  try {
    const evaluation = await Evaluation.findByPk(evaluationId);
    if (evaluation) {
      await evaluation.update(evaluationData);
      return evaluation;
    }
    return null;
  } catch (error) {
    console.error(error)
  }

};

exports.deleteEvaluation = async (evaluationId) => {
  try {
    const evaluation = await Evaluation.findByPk(evaluationId);
    if (evaluation) {
      await evaluation.destroy();
      return evaluation;
    }
    return null;
  } catch (error) {
    console.error(error)
  }

};

exports.saveResultEvaluation = async (evaluationResult) => {
  try {
    const result = await EvaluationResult.create(evaluationResult);
    return result
  } catch (error) {
    console.error(error);
  }
}