const preQuizzService = require('../../services/courses/preQuizzService');

exports.getAllPreQuizzes = async (req, res) => {
  try {
    const preQuizzes = await preQuizzService.getAllPreQuizzes();
    res.json(preQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getPreQuizzById = async (req, res) => {
  const preQuizzId = req.params.id;
  try {
    const preQuizz = await preQuizzService.getPreQuizzById(preQuizzId);
    if (preQuizz) {
      res.json(preQuizz);
    } else {
      res.status(404).json({ error: 'PreQuizz no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createPreQuizz = async (req, res) => {
  const preQuizzDataArray = req.body;
  console.log(preQuizzDataArray);
  try {
    const createdPreQuizzes = await Promise.all(preQuizzDataArray.map(async (preQuizzData) => {
      return await preQuizzService.createPreQuizz(preQuizzData);
    }));
    res.json(createdPreQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.updatePreQuizz = async (req, res) => {
  const preQuizzId = req.params.id;
  const preQuizzData = req.body;
  try {
    const updatedPreQuizz = await preQuizzService.updatePreQuizz(preQuizzId, preQuizzData);
    if (updatedPreQuizz) {
      res.json(updatedPreQuizz);
    } else {
      res.status(404).json({ error: 'PreQuizz no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deletePreQuizz = async (req, res) => {
  const preQuizzId = req.params.id;
  try {
    const deletedPreQuizz = await preQuizzService.deletePreQuizz(preQuizzId);
    if (deletedPreQuizz) {
      res.json({ message: 'PreQuizz eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'PreQuizz no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getPreQuizzesByCourseId = async (req, res) => {
  const courseId = req.params.course_id;
  console.log(courseId);
  try {
    const preQuizzes = await preQuizzService.getPreQuizzesByCourseId(courseId);
    res.json(preQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
