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

exports.getCourseStudentsWithPrequizzResultsByUserAndCampaign = async (req, res) => {
    const { userId, campaignId } = req.params;
    try {
        const courseStudents = await customPrequizzService.getCourseStudentsWithPrequizzResultsByUser(userId, campaignId);
        return res.status(200).json({ success: true, data: courseStudents });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Error al obtener los estudiantes de curso con resultados de prequizz por user_id y campaign_id' });
    }
};