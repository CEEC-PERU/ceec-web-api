// rankingController.js
const rankingService = require('../../services/courses/rankingService');
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
const generateExcel = async (req, res, next) => {
  try {
    const { course_id } = req.params;

    // Obtener los resultados utilizando la función getAverageScoresByCourseAndUser
    const results = await rankingService.getAverageScoresByCourseAndUser(course_id);

    // Crear un nuevo workbook de Excel
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    // Agregar encabezados
    worksheet.addRow([ 'Email','Modulo', 'Evaluation','Total Score','Puntuación Promedio', 'Estado']);

    // Agregar datos de resultados
results.forEach(result => {
  result.evaluations.forEach(evaluation => {
    worksheet.addRow([
      result.User.email,
      evaluation.Evaluation.Module.name,
      evaluation.Evaluation.name,
      evaluation.total_score,
      result.average_score,
      result.status
    ]);
  });
});
    // Guardar el workbook como un archivo Excel
    const excelBuffer = await workbook.xlsx.writeBuffer();
    
    // Enviar el archivo Excel como respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=results.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el archivo Excel' });
  }
};



module.exports = { getAverageScores, generateExcel };
