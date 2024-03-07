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
     const user_id = req.params.iduser;
        const course_id = req.params.idcourse;
    try {
       
        const evaluation = await customPrequizzService.getEvaluationDataByUserandCourse(user_id ,course_id)
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        throw error
    }
}