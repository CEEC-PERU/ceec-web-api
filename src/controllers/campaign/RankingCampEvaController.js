const  RankingCampEvaService = require('../../services/campaign/RankingCampEvaService.js'); 
const getAverageScores = async (req, res, next) => {
  try {
    const { campaign_id } = req.params;
    const averageScores = await RankingCampEvaService.getAverageScoresByCourseAndUser(campaign_id);
    res.json(averageScores);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAverageScores };
