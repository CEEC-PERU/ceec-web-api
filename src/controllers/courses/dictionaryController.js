const dictionaryQuizService = require('../../services/courses/dictionaryService');

exports.getAllDictionaryQuizzes = async (req, res) => {
  try {
    const quizzes = await dictionaryQuizService.getAllDictionaryQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getDictionaryQuizById = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await dictionaryQuizService.getDictionaryQuizById(quizId);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ error: 'Quiz del diccionario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createDictionaryQuiz = async (req, res) => {
  const quizData = req.body;
  try {
    const newQuiz = await dictionaryQuizService.createDictionaryQuiz(quizData);
    res.json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateDictionaryQuiz = async (req, res) => {
  const quizId = req.params.id;
  const quizData = req.body;
  try {
    const updatedQuiz = await dictionaryQuizService.updateDictionaryQuiz(quizId, quizData);
    if (updatedQuiz) {
      res.json(updatedQuiz);
    } else {
      res.status(404).json({ error: 'Quiz del diccionario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteDictionaryQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const deletedQuiz = await dictionaryQuizService.deleteDictionaryQuiz(quizId);
    if (deletedQuiz) {
      res.json({ message: 'Quiz del diccionario eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Quiz del diccionario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getDictionaryQuizzesByModuleId = async (req, res) => {
  const moduleId = req.params.module_id;
  try {
    const quizzes = await dictionaryQuizService.getDictionaryQuizzesByModuleId(moduleId);
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
