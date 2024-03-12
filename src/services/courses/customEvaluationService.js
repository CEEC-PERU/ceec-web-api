const Evaluation = require("../../models/evaluationModel");
const Module = require("../../models/moduleModel");
const Quizz = require("../../models/quizzModel");
const Option = require("../../models/optionModel")
const CourseStudent = require('../../models/courseStudent');
const Course = require('../../models/courseModel');
const EvaluationResult = require("../../models/evaluationResultModel");

exports.getEvaluationDataByModule = async (module_id) => {
    try {
        const evaluation = await Module.findByPk(module_id ,{
            include: {
                model: Evaluation,
                include: {
                    model: Quizz,
                    include: {
                        model: Option
                    }
                }
            }
        })
        return evaluation
    } catch (error) {
        console.error(error);
        throw error;
    }
}
  



    exports.getAssignedCoursesWithEvaluations = async (userId) => {
        try {
            const assignedCourses = await CourseStudent.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Course,
                        attributes: ['course_id', 'name'],
                        include: [
                            {
                                model: Module,
                                as: 'modules', // Alias correcto para la relación Course-Module
                                include: [
                                    {
                                        model: Evaluation,
                                        include: [
                                            {
                                                model: EvaluationResult,
                                                where: { user_id: userId },
                                                required: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ],
            });
            return assignedCourses
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener los cursos asignados y las evaluaciones');
        }
    };