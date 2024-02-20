const FlashCard = require('../../models/flashCardModel');

exports.getAllFlashCards = async () => {
  try {
    return await FlashCard.findAll();
  } catch (error) {
    console.error(error);
  }
};

exports.getFlashCardById = async (flashCardId) => {
  try {
    return await FlashCard.findByPk(flashCardId);
  } catch (error) {
    console.error(error);
  }
};

exports.createFlashCard = async (flashCardData) => {
  try {
    return await FlashCard.create(flashCardData);
  } catch (error) {
    console.error(error);
  }
};

exports.updateFlashCard = async (flashCardId, flashCardData) => {
  try {
    const flashCard = await FlashCard.findByPk(flashCardId);
    if (flashCard) {
      await flashCard.update(flashCardData);
      return flashCard;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


exports.getFlashCardsByModuleId = async (moduleId) => {
  try {
    return await FlashCard.findAll({
      where: { module_id: moduleId },
    });
  } catch (error) {
    console.error(error);
  }
};
