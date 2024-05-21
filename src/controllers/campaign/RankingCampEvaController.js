const  RankingCampEvaService = require('../../services/campaign/RankingCampEvaService.js'); 
const  RankingCampEvaPreqizz = require('../../services/campaign/RankingCampEvaPreService.js'); 
const  RankingCampEvaPreqizzv2 = require('../../services/campaign/RankingCampaignServicev2.js'); 
const  RankingDataGeneral = require('../../services/campaign/RankingClientService.js'); 
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


const getAverageEvaPrequizzv2 = async (req, res, next) => {
  try {
    const { campaign_id  , client_id} = req.params;
    const averageScores = await RankingCampEvaPreqizzv2.getAverageScoresByCampaignQuiz(campaign_id , client_id);
    res.json(averageScores);
  } catch (error) {
    next(error);
  }
};
const getDataGeneral = async (req, res, next) => {
  try {
    const {  client_id} = req.params;
    const averageScores = await RankingDataGeneral.getAverageScoresByClient(client_id);
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



module.exports = { getAverageScores  , getAverageEvaPrequizz , getAllDataCampaign , getAverageEvaPrequizzv2 , getDataGeneral};
