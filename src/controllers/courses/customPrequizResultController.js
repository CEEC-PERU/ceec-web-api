const customPrequizzService = require("../../services/courses/customPrequizzService")

exports.getEvaluationByCourse = async (req, res) => {
    try {
        const course_id = req.params.id
        const evaluation = await customPrequizzService.getEvaluationDataByCourse(course_id)
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.getEvaluationByUserandCourse = async (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    try {
        const evaluation = await customPrequizzService.getEvaluationDataByUserandCourse(userId ,courseId)
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        throw error
    }
}