// rankingController.js
const rankingService = require('../../services/courses/rankingService');

exports.getRankingCourseEvaluation = async (req, res) => {
  try {
    const { course_id } = req.params;
    const ranking = await rankingService.getRankingCourseEvaluation(course_id);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}