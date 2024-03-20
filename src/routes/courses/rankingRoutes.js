// rankingRoutes.js
const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/courses/rankingController');
//traer todas las notas del evaluation , que seria el promedio del curso por user ,
// es decir de el total_score de cada evaluation result ,pero primero verificar si se creo el modulo
router.get('/:course_id', rankingController.getRankingCourseEvaluation);
//traer t
module.exports = router;