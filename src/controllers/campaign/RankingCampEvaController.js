const  RankingCampEvaService = require('../../services/campaign/RankingCampEvaService.js'); 
const  RankingCampEvaPreqizz = require('../../services/campaign/RankingCampEvaPreService.js'); 
const  RankingCampaign = require('../../services/campaign/RankinCampaignService.js'); 
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
    const { campaign_id  , client_id} = req.params;
    const averageScores = await RankingCampEvaPreqizz.getAverageScoresByCampaignQuiz(campaign_id , client_id);
    res.json(averageScores);
  } catch (error) {
    next(error);
  }
};

const getAllDataCampaign = async (req, res, next) => {
  try {
    const { campaign_id  , client_id} = req.params;
    const averageScores = await RankingCampaign.getAverageScoresByCampaignQuiz(campaign_id , client_id);
    res.json(averageScores);
  } catch (error) {
    next(error);
  }
};



module.exports = { getAverageScores  , getAverageEvaPrequizz , getAllDataCampaign};
