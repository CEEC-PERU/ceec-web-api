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


