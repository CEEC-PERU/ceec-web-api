const quizzTypeService = require('../../services/courses/quizzTypeServices');

// Get all quizz types
exports.getAllQuizzTypes = async (req, res) => {
  try {
    const quizzTypes = await quizzTypeService.getAllQuizzTypes();
    res.json(quizzTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quizz types' });
  }
};

// Get quizz type by ID
exports.getQuizzTypeById = async (req, res) => {
  const { quizztype_id } = req.params;
  try {
    const quizzType = await quizzTypeService.getQuizzTypeById(quizztype_id);
    res.json(quizzType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quizz type by ID' });
  }
};

// Create a new quizz type
exports.createQuizzType = async (req, res) => {
  try {
    const quizzType = await quizzTypeService.createQuizzType(req.body);
    res.json(quizzType);
  } catch (error) {
    console.error(error);

    // Devuelve detalles específicos del error al cliente
    res.status(500).json({ error: 'Failed to create quizz type', details: error.message });
  }
};


// Update quizz type by ID
exports.updateQuizzTypeById = async (req, res) => {
  const { quizztype_id } = req.params;
  try {
    const updatedQuizzType = await quizzTypeService.updateQuizzTypeById(quizztype_id, req.body);
    res.json(updatedQuizzType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update quizz type' });
  }
};

