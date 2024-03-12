const PrequizzResult = require("../../models/preQuizzResultModel");
const Course = require("../../models/courseModel");
const User = require("../../models/userModel");
const CourseStudent = require("../../models/courseStudent");
const { Sequelize } = require('sequelize');
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
exports.getCourseStudentsWithPrequizzResultsByUser = async (userId) => {
    try {
        const courseStudentsWithPrequizzResults = await CourseStudent.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Course,
                    attributes: ['name'],
                   include : [ 
                    {
                        model: PrequizzResult,
                        attributes: ['pre_result_id', 'puntaje', 'efectividad', 'user_id', 'course_id'],
                        where: { user_id: userId }, // Filtrar los resultados de prequizz por user_id
                        required: false
                    }
                
                
                ]
                }
               
            ]
        });

        return courseStudentsWithPrequizzResults;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los CourseStudents y los resultados de Prequizz por user_id');
    }
};
