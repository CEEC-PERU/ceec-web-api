const PrequizzResult = require("../../models/preQuizzResultModel");
const Course = require("../../models/courseModel");
const User = require("../../models/userModel");

exports.getEvaluationDataByCourse = async (course_id) => {
    try {
        const course = await Course.findByPk(course_id ,{
            include: {
                model: PrequizzResult,
                include: {
                    model: User,
                },
            }
        })
        return course
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.getEvaluationDataByUserandCourse = async (userId , courseId) => {
    if (typeof userId === 'undefined' || typeof courseId === 'undefined') {
        throw new Error('userId y courseId no pueden ser undefined');
    }
    try {
        const results = await PrequizzResult.findAll({
            where: {
                user_id: userId,
                course_id: courseId
            },
            include: User
        });
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los resultados de evaluación por user_id y course_id');
    }
};

