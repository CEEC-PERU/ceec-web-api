const QuizzType = require('../../models/quizzTypeModel');

// Get all quizz types
exports.getAllQuizzTypes = async () => {
  try {
    return QuizzType.findAll();
  } catch (error) {
    throw error;
  }
};

// Get quizz type by ID
exports.getQuizzTypeById = async (quizztype_id) => {
  try {
    return QuizzType.findByPk(quizztype_id);
  } catch (error) {
    throw error;
  }
};

// Create a new quizz type
exports.createQuizzType = async (quizzTypeData) => {
  try {
    return QuizzType.create(quizzTypeData);
  } catch (error) {
    throw error;
  }
};

// Update quizz type by ID
exports.updateQuizzTypeById = async (quizztype_id, quizzTypeData) => {
  try {
    await QuizzType.update(quizzTypeData, {
      where: { quizztype_id },
    });
    return this.getQuizzTypeById(quizztype_id);
  } catch (error) {
    throw error;
  }
};

