// rankingRoutes.js
const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/courses/rankingController');
const rankingCampEvaController = require('../../controllers/campaign/RankingCampEvaController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.get('/:course_id/:client_id', rankingController.getAverageScores);
//obtener por course_id  y user_id  lista de evaluaciones y prequizz por ususario
router.get('/student/:course_id/:user_id', rankingController.getAverageCoursebyStudent);
//antes
router.get('/eva/:campaign_id',authenticateToken, rankingCampEvaController.getAverageScores);
//obtener por filtro de campaña y cliente_id todos las evaluaciones y prequizz de cada usuario con su respectivo curso. ,  movil ranking
router.get('/eva/pre/:campaign_id/:client_id', rankingCampEvaController.getAverageEvaPrequizz);
//obtener EN JSON todos los datos por campaña , movil descarga de datos
router.get('/eva/pre/v2/:campaign_id/:client_id', rankingCampEvaController.getAverageEvaPrequizzv2);
//ranking data general , por client_id

router.get('/:client_id', rankingCampEvaController.getDataGeneral);

//obtener todas las campañas por client_id , no habilitado
router.get('/campaign/:client_id/:campaign_id',authenticateToken, rankingCampEvaController.getAllDataCampaign);

//filtrar por cursos y  por client_id , excel
router.get('/excel/:course_id/:client_id',rankingController.generateExcel);

//obtener todas las campañas por client_id , excel 
router.get('/excel/campaign/:campaign_id/:client_id',rankingController.generateExcelCampaign);

module.exports = router;
