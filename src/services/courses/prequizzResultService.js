const PreqquizzResult  = require('../../models/preQuizzResultModel'); 

exports.createPrequizzResult = async (evaluationResultData) => {
    try {
      return await PreqquizzResult.create(evaluationResultData);
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear el resultado de evaluación');
    }
  };

exports.updatePrequizzResult = async (resultId, evaluationResultData) => {
    try {
      const result = await PreqquizzResult.findByPk(resultId);
      if (result) {
        await result.update(evaluationResultData);
        return result;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el resultado de evaluación');
    }
};

exports.getPrequizzResultById = async (resultId) => {
    try {
      return await PreqquizzResult.findByPk(resultId);
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener el resultado de evaluación por ID');
    }
    
  };

  exports.saveResultEvaluation = async (evaluationResult) => {
    try {
      const result = await PreqquizzResult.create(evaluationResult);
      return result
    } catch (error) {
      console.error(error);
    }
  }

  exports.deletePrequizzResultById = async (resultId) => {
    try {
        const result = await PreqquizzResult.findByPk(resultId);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el resultado de evaluación');
    }
};

exports.getAllPrequizzResults = async () => {
  try {
      return await PreqquizzResult.findAll();
  } catch (error) {
      console.error(error);
      throw new Error('Error al obtener todos los resultados de prequizz');
  }
};