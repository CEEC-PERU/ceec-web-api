// rankingController.js
const rankingService = require('../../services/courses/rankingService');
const rankingService2 = require('../../services/campaign/RankinCampaignService');
const excel = require('exceljs');
const getAverageScores = async (req, res) => {
  const { course_id , client_id} = req.params;
  try {
    const averageScores = await rankingService.getAverageScoresByCourseAndUser(course_id , client_id);
    res.json(averageScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAverageCoursebyStudent = async (req, res) => {
    const { course_id, user_id } = req.params;
    try {
      const averageScores = await rankingService.getAverageCoursebyStudent(course_id , user_id);
      res.json(averageScores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
const generateExcel = async (req, res, next) => {
  try {
    const { course_id, client_id } = req.params;
    const results = await rankingService.getAverageScoresByCourseAndUser(course_id, client_id);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    const headers = ['Curso', 'Email', 'Nombre y Apellidos'];
    results[0].evaluations.forEach((_, i) => {
      headers.push(`Módulo ${i+1}`, `Evaluación ${i+1}`, `Total Score ${i+1}`, `Realizó Examen ${i+1}`);
    });
    headers.push('Suma Total ','Promedio', 'Estado', 'Prequizz Puntaje' ,'Prequizz Estado');
    worksheet.addRow(headers);

    results.forEach(result => {
      const fullName = result.User.Profile ? `${result.User.Profile.first_name} ${result.User.Profile.last_name}` : 'No Actualiza';
      const row = [result.Course.name, result.User.email, fullName];
      result.evaluations.forEach(evaluation => {
        row.push(evaluation.Evaluation.Module.name, evaluation.Evaluation.name, evaluation.total_score, evaluation.realize_exam ? 'SI' : 'NO');
      });
      row.push(result.total_score_sum ,result.average_score, result.status, result.prequizzResults.length > 0 ? result.prequizzResults[0].puntaje : 'N/A' ,  result.prequizzResults[0].status );
      worksheet.addRow(row);
    });

    const excelBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=results.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el archivo Excel' });
  }
};

const generateExcelCampaign = async (req, res, next) => {
  try {
    const { campaign_id, client_id } = req.params;
    const results = await rankingService2.getAverageScoresByCampaignQuiz(campaign_id, client_id);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('ResultadosCampaign');

    // Construir encabezados dinámicamente
    const headers = ['Curso', 'Email', 'Nombre y Apellidos'];
    results[0].evaluations.forEach((_, i) => {
      headers.push(`Módulo ${i+1}`, `Evaluación ${i+1}`, `Total Score ${i+1}`, `Realizó Examen ${i+1}`);
    });
    headers.push('Suma Total ','Promedio', 'Estado', 'Prequizz Puntaje' ,'Prequizz Estado');
    worksheet.addRow(headers);

    // Construir filas de datos dinámicamente
    results.forEach(result => {
      const fullName = result.User.Profile ? `${result.User.Profile.first_name} ${result.User.Profile.last_name}` : 'No Actualiza';
      const row = [result.Course.name, result.User.email, fullName];
      result.evaluations.forEach(evaluation => {
        row.push(evaluation.Evaluation.Module.name, evaluation.Evaluation.name, evaluation.total_score, evaluation.realize_exam ? 'SI' : 'NO');
      });
      row.push(result.total_score_sum ,result.average_score, result.status, result.prequizzResults.length > 0 ? result.prequizzResults[0].puntaje : 'N/A' ,  result.prequizzResults[0].status );
      worksheet.addRow(row);
    });

    const excelBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=results.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el archivo Excel' });
  }
};




module.exports = { getAverageScores, generateExcel , getAverageCoursebyStudent , generateExcelCampaign};

