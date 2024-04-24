// rankingRoutes.js
const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/courses/rankingController');
const rankingCampEvaController = require('../../controllers/campaign/RankingCampEvaController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');
//traer todas las notas del evaluation , que seria el promedio del curso por user ,
// es decir de el total_score de cada evaluation result ,pero primero verificar si se creo el modulo


//obtener por course_id  y client_id lista de evaluaciones y prequizz?
router.get('/:course_id/:client_id', rankingController.getAverageScores);


//obtener por course_id  y user_id  lista de evaluaciones y prequizz por ususario
router.get('/student/:course_id/:user_id', rankingController.getAverageCoursebyStudent);


//antes
router.get('/eva/:campaign_id',authenticateToken, rankingCampEvaController.getAverageScores);

//obtener por filtro de campaña y cliente_id todos las evaluaciones y prequizz de cada usuario con su respectivo curso. , despues
router.get('/eva/pre/:campaign_id/:client_id', rankingCampEvaController.getAverageEvaPrequizz);

//obtener todas las campañas por client_id , no habilitado
router.get('/campaign/:client_id/:campaign_id',authenticateToken, rankingCampEvaController.getAllDataCampaign);


//obtener todas las campañas por client_id general excel
router.get('/excel/:course_id/:client_id',rankingController.generateExcel);

//obtener todas las campañas por client_id  
router.get('/excel/campaign/:campaign_id/:client_id',rankingController.generateExcelCampaign);


module.exports = router;
