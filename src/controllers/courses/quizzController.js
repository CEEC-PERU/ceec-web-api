const Quizz = require('../../models/quizzModel');
const quizzService = require('../../services/courses/quizzService');

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizzService.getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getQuizzById = async (req, res) => {
  const quizzId = req.params.id;
  try {
    const quizz = await quizzService.getQuizzById(quizzId);
    if (quizz) {
      res.json(quizz);
    } else {
      res.status(404).json({ error: 'Quizz not found' });
    }
  } catch (error) {
    console.error('Error fetching quizz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createQuizz = async (req, res) => {
  const { evaluation_id,  image_url, question , correct_answer , incorrect_answer , points} = req.body;
  try {
    const newQuizz = await quizzService.createQuizz({ evaluation_id,  image_url, question , correct_answer , incorrect_answer, points });
    res.json(newQuizz);
  } catch (error) {
    console.error('Error creating quizz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateQuizz = async (req, res) => {
  const quizzId = req.params.id;
  const { evaluation_id,  image_url, question , correct_answer , incorrect_answer , points} = req.body;
  try {
    const updatedQuizz = await quizzService.updateQuizz(quizzId, { evaluation_id,  image_url, question , correct_answer , incorrect_answer , points});
    if (updatedQuizz) {
      res.json(updatedQuizz);
    } else {
      res.status(404).json({ error: 'Quizz not found' });
    }
  } catch (error) {
    console.error('Error updating quizz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteQuizz = async (req, res) => {
  const quizzId = req.params.id;
  try {
    const deletedQuizz = await quizzService.deleteQuizz(quizzId);
    if (deletedQuizz) {
      res.json({ message: 'Quizz deleted successfully' });
    } else {
      res.status(404).json({ error: 'Quizz not found' });
    }
  } catch (error) {
    console.error('Error deleting quizz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// En quizzController.js
exports.getQuizzesByEvaluationId = async (req, res) => {
  const evaluationId = req.params.evaluation_id; // Asegúrate de obtener el valor correctamente desde la ruta
  try {
    const quizzes = await quizzService.getQuizzesByEvaluationId(evaluationId);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes by evaluation_id:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
