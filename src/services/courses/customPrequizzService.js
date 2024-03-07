const PrequizzResult = require("../../models/preQuizzResultModel");
const Course = require("../../models/courseModel");
const User = require("../../models/userModel");

exports.getEvaluationDataByCourse = async (course_id) => {
    try {
        const evaluation = await Course.findByPk(course_id ,{
            include: {
                model: PrequizzResult,
              
            }
        })
        return evaluation
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.getEvaluationDataByUserandCourse = async (userId , courseId) => {
    try {
        return await PrequizzResult.findAll({
            where: {
              user_id: userId,
              course_id: courseId,
            },
          });
    } catch (error) {
        console.error(error);
    throw new Error('Error al obtener los resultados de evaluación por user_id y evaluation_id');
  }
};

