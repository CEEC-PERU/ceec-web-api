// rankingController.js
const rankingService = require('../../services/courses/rankingService');

const getAverageScores = async (req, res) => {
  const { course_id } = req.params;
  try {
    const averageScores = await rankingService.getAverageScoresByCourseAndUser(course_id);
    res.json(averageScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAverageScores };
