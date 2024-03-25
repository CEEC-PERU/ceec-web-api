const  RankingCampEvaService = require('../../services/campaign/RankingCampEvaService.js'); 
const  RankingCampEvaPreqizz = require('../../services/campaign/RankingCampEvaPreService.js'); 
const getAverageScores = async (req, res, next) => {
  try {
    const { campaign_id } = req.params;
    const averageScores = await RankingCampEvaService.getAverageScoresByCourseAndUser(campaign_id);
    res.json(averageScores);
  } catch (error) {
    next(error);
  }
};

const getAverageEvaPrequizz = async (req, res, next) => {
  try {
    const { campaign_id } = req.params;
    const averageScores = await RankingCampEvaPreqizz.getAverageScoresByCampaignQuiz(campaign_id);
    res.json(averageScores);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAverageScores  , getAverageEvaPrequizz};
