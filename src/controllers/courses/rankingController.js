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
    const { course_id, client_id } = req.params;
    const results = await rankingService.getAverageScoresByCourseAndUser(course_id, client_id);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

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
module.exports = { getAverageScores, generateExcel };


//colocar el  {"first_name": "Wolgfang","last_name": " Jimenez ",  en una sola comlumna denominada nombre y apellidos

//que las evaluaciones en el excel :"evaluations": [ { "user_id": 10, "evaluation_id": 3, "total_score": "14", "Evaluation": { "evaluation_id": 3, "name": "Tipo de Comunicación", "Module": { "module_id": 5, "name": "Funciones y tipos de comunicación" } }, "realize_exam": true }, { "user_id": 10, "evaluation_id": 2, "total_score": "12", "Evaluation": { "evaluation_id": 2, "name": "Cuestonario La Comunicación", "Module": { "module_id": 4, "name": "La comunicación:Su importancia y características" } }, "realize_exam": true }, { "user_id": 10, "evaluation_id": 4, "total_score": 0, "Evaluation": { "evaluation_id": 4, "name": "Barrera de la Comunicación", "Module": { "module_id": 6, "name": "Ventajas y barreras de la comunicación" } }, "realize_exam": false }, { "user_id": 10, "evaluation_id": 5, "total_score": 0, "Evaluation": { "evaluation_id": 5, "name": "Comunicación Intrapersonal", "Module": { "module_id": 7, "name": "Comunicación intrapersonal" } }, "realize_exam": false }, { "user_id": 10, "evaluation_id": 6, "total_score": 0, "Evaluation": { "evaluation_id": 6, "name": "Comunicación Interpersonal", "Module": { "module_id": 8, "name": "Comunicación Interpersonal" } }, "realize_exam": false } ], se coloquen en una fila es decir modulo , evaluacion , totalscore , modulo ,  evaluacion, totalscore , asi dependiendo de las evaluations que tiene el usuario por lo cual el addRow tambien va a depender de eso ya que por defecto
//estaria mal ya que colocar evaluation1 , evlauation2 , tiene que ser dinamico de acuerdo a la cantidad de evaluaciones , modulos y totalscore que tiene 

